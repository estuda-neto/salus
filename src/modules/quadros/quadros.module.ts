import { Module } from '@nestjs/common';
import { QuadrosService } from './quadros.service';
import { QuadrosController } from './quadros.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quadro } from './entities/quadro.entity';
import { QuadroRepository } from './repositories/preferencias.repository';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { PreferenciasModule } from '../preferencias/preferencias.module';

@Module({
  imports: [SequelizeModule.forFeature([Quadro]), UsuariosModule, PreferenciasModule],
  controllers: [QuadrosController],
  providers: [QuadrosService, QuadroRepository],
  exports: [QuadrosService],
})
export class QuadrosModule { }
