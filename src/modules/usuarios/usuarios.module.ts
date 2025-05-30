import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from './entities/usuario.entity';
import { UsuarioRepository } from './repositories/usuarios.repository';
import { AuthService } from './auth.service';
import { EmailsService } from './emails.service';
import { TokensService } from './token.service';
import { EmpresaServico } from '../servicos/entities/empresa_servico.entity';
import { EmpresasModule } from '../empresas/empresas.module';

@Module({
  imports: [SequelizeModule.forFeature([Usuario]), EmpresasModule],
  controllers: [UsuariosController],
  providers: [
    UsuariosService,
    AuthService,
    EmailsService,
    TokensService,
    UsuarioRepository,
    EmpresaServico,
  ],
  exports: [UsuariosService],
})
export class UsuariosModule { }
