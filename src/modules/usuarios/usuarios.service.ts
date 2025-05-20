import { Injectable } from '@nestjs/common';
import { Usuario } from './entities/usuario.entity';
import { BaseRepository } from 'src/base/base.repository';
import { InjectModel } from '@nestjs/sequelize';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class UsuariosService extends BaseService<Usuario> {

  constructor(@InjectModel(Usuario) usuarioModel: typeof Usuario) {
    super(new BaseRepository<Usuario>(usuarioModel));
  }
}
