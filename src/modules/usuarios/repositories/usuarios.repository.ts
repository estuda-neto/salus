import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from '../entities/usuario.entity';
import { InferCreationAttributes } from 'sequelize';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { BaseRepository } from 'src/base/base.repository';
import { TipoUsuario } from '../utils/enums/tipousuario';

@Injectable()
export class UsuarioRepository extends BaseRepository<Usuario> {
  constructor(@InjectModel(Usuario) private readonly usuarioModel: typeof Usuario) {
    super(usuarioModel);
  }

  async criar(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const data = createUsuarioDto as InferCreationAttributes<Usuario>;
    return await this.create(data);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.usuarioModel.findOne({ where: { email } });
  }

  async buscarTodos(): Promise<Usuario[]> {
    return this.findAll();
  }

  async buscarPorTipo(tipo: TipoUsuario): Promise<Usuario[]> {
    return await this.usuarioModel.findAll({
      where: { tipoUsuario: tipo },
    });
  }

  async findProfissionalsIdsByEmpresaIdAndTipoAdmin(empresaId: number): Promise<number[]> {
    //corrigir  ou: TipoUsuarioEnum.PROFISSIONAL se usar enum
    return this.usuarioModel.findAll({ where: { empresaId, tipoUsuario: 'profissional' }, attributes: ['usuarioId'], raw: true, }).then(results => results.map(r => r.usuarioId));
  }
}
