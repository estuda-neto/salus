import { Injectable } from '@nestjs/common';
import { InferCreationAttributes } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entities/usuario.entity';
import { BaseService } from 'src/base/base.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuarioRepository } from './repositories/usuarios.repository';

@Injectable()
export class UsuariosService extends BaseService<Usuario,CreateUsuarioDto> {

  //injetamos e passmos UsuarioRepository, como extends Baserepository eleé um repository, então temos acesso
  //this.repository e this.usuariosRepository
  constructor(private readonly usuariosRepository: UsuarioRepository) {
    super(usuariosRepository);
  }

  async create(createDto:CreateUsuarioDto):Promise<Usuario>{
    createDto.password = await this.hashPassword(createDto.password);
    const usuarioData = createDto as InferCreationAttributes<Usuario>;
    return await this.repository.create(usuarioData);
  }

  async getByEmail(email: string): Promise<Usuario | null> {
    return this.usuariosRepository.buscarPorEmail(email);
  }

  private async hashPassword(password: string):Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
