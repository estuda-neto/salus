import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from './entities/usuario.entity';
import { UsuarioRepository } from './repositories/usuarios.repository';

@Module({
  imports: [SequelizeModule.forFeature([Usuario])],
  controllers: [UsuariosController],
  providers: [UsuariosService, UsuarioRepository],
  exports: [UsuariosService]
})
export class UsuariosModule { }
