import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from '../entities/usuario.entity';
import { InferCreationAttributes } from 'sequelize';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';

@Injectable()
export class UsuarioRepository {
  constructor(@InjectModel(Usuario) private readonly usuarioModel: typeof Usuario) {}

  async criar(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const data = createUsuarioDto as InferCreationAttributes<Usuario>;
    return await this.usuarioModel.create(data);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.usuarioModel.findOne({ where: { email } });
  }

  async buscarTodos(): Promise<Usuario[]> {
    return this.usuarioModel.findAll();
  }

  // Outros métodos como atualizar, deletar etc.
}