import { Injectable } from '@nestjs/common';
import { InferCreationAttributes } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entities/usuario.entity';
import { BaseService } from 'src/base/base.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuarioRepository } from './repositories/usuarios.repository';
import { EmailsService } from './emails.service';
import { TokensService } from './token.service';
import { ApiError } from 'src/base/base.error';
import { fromString, TipoUsuario } from './utils/enums/tipousuario';

@Injectable()
export class UsuariosService extends BaseService<Usuario, CreateUsuarioDto> {
  //injetamos e passmos UsuarioRepository, como extends Baserepository eleé um repository, então temos acesso
  //this.repository e this.usuariosRepository
  constructor(
    private readonly usuariosRepository: UsuarioRepository,
    private readonly emailsService: EmailsService,
    private readonly tokensService: TokensService,
  ) {
    super(usuariosRepository);
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async create(createDto: CreateUsuarioDto): Promise<Usuario> {
    createDto.password = await this.hashPassword(createDto.password);
    const usuarioData = createDto as InferCreationAttributes<Usuario>;
    return await this.repository.create(usuarioData);
  }

  async getByEmail(email: string): Promise<Usuario | null> {
    return this.usuariosRepository.buscarPorEmail(email);
  }

  public async sendEmailWithHashResetPassword(email: string): Promise<boolean> {
    const usuario = await this.usuariosRepository.buscarPorEmail(email);
    if (usuario) {
      try {
        const token = await this.tokensService.generateToken(email);
        /** to: string → O destinatário do e-mail (exemplo: "usuario@email.com").
         *  subject: string → O assunto do e-mail (exemplo: "Bem-vindo ao nosso serviço!").
         *  text: string → O corpo do e-mail em texto puro (sem formatação HTML).
         *  html?: string → (Opcional) O corpo do e-mail em formato HTML, permitindo estilização e formatação. */
        this.emailsService.sendEmail(
          email,
          'Token para redefinição de senha',
          token,
          `um html "${token}"`,
        );
      } catch (error) {
        throw new Error(`Deu pau:${error}`);
      }
      return true;
    }
    return false;
  }

  public async redefinirSenha(token: string, email: string, password: string, repassword: string): Promise<number> {
    const tokenvalido = await this.tokensService.validateToken(token, email);
    if (tokenvalido) {
      const objetoEmailDecritado = await this.tokensService.decryptToken(token);
      if (objetoEmailDecritado === email && password === repassword) {
        const usuario = await this.usuariosRepository.buscarPorEmail(email);
        if (usuario) {
          const salt = await bcrypt.genSalt(12);
          usuario.password = await bcrypt.hash(password, salt);
          const [atualizou] = await this.usuariosRepository.update(usuario?.usuarioId, usuario);
          return atualizou;
        }
      }
    }
    return 0;
  }

  public async listarPaginado(limit: number, offset: number): Promise<{ rows: Usuario[]; count: number }> {
    const objectWithUsuarios = await this.usuariosRepository.findWithPagination(limit, offset);
    if (!objectWithUsuarios) throw new ApiError('Erro interno: o recurso não pôde ser recuperado!', 400, 'O limite ou offset está inválido');
    return objectWithUsuarios;
  }

  public async getUsersOfType(tipoUsuario: string): Promise<Usuario[]> {
    let tipo: TipoUsuario;
    try {
      tipo = fromString(tipoUsuario);
    } catch (error) {
      throw new ApiError('Tipo de usuário inválido.', 400, 'Tipo de usuário inválido. Valores válidos: admin, paciente, funcionario, profissional.');
    }
    return await this.usuariosRepository.buscarPorTipo(tipo);
  }


}
