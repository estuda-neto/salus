import { Module } from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { ServicosController } from './servicos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Servico } from './entities/servico.entity';
import { ServicosRepository } from './repository/servicosRepository';

@Module({
  imports: [SequelizeModule.forFeature([Servico])],
  controllers: [ServicosController],
  providers: [ServicosService, ServicosRepository],
  exports: [ServicosService]
})
export class ServicosModule { }
