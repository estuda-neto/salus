import { Module } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { EmpresasController } from './empresas.controller';
import { Empresa } from './entities/empresa.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmpresasRepository } from './repository/empresasRepository';

@Module({
  imports: [SequelizeModule.forFeature([Empresa])],
  controllers: [EmpresasController],
  providers: [EmpresasService, EmpresasRepository],
  exports: [EmpresasService],
})
export class EmpresasModule {}
