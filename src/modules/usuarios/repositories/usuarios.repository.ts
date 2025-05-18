import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from '../entities/usuario.entity';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class UsuarioRepository {
  constructor(@InjectModel(Usuario) private readonly usuarioModel: typeof Usuario) {}

  async criar(usuarioData: CreationAttributes<Usuario>): Promise<Usuario> {
    return this.usuarioModel.create(usuarioData);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.usuarioModel.findOne({ where: { email } });
  }

  async buscarTodos(): Promise<Usuario[]> {
    return this.usuarioModel.findAll();
  }

  // Outros métodos como atualizar, deletar etc.
}