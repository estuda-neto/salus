import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from './entities/usuario.entity';
import { UsuarioRepository } from './repositories/usuarios.repository';
import { AuthService } from './auth.service';
import { EmailsService } from './emails.service';
import { TokensService } from './token.service';

@Module({
  imports: [SequelizeModule.forFeature([Usuario])],
  controllers: [UsuariosController],
  providers: [UsuariosService, AuthService, EmailsService, TokensService, UsuarioRepository],
  exports: [UsuariosService]
})
export class UsuariosModule { }
