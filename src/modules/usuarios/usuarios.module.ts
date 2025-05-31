import { forwardRef, Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from './entities/usuario.entity';
import { UsuarioRepository } from './repositories/usuarios.repository';
import { AuthService } from './auth.service';
import { EmailsService } from './emails.service';
import { TokensService } from './token.service';
import { EmpresasModule } from '../empresas/empresas.module';

@Module({
  imports: [SequelizeModule.forFeature([Usuario]), forwardRef(() => EmpresasModule)],
  controllers: [UsuariosController],
  providers: [UsuariosService, AuthService, EmailsService, TokensService, UsuarioRepository],
  exports: [UsuariosService, AuthService, EmailsService, TokensService, UsuarioRepository],
})
export class UsuariosModule { }
