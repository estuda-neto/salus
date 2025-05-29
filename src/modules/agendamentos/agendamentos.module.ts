import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Agendamento } from './entities/agendamento.entity';
import { AgendamentosRepository } from './repository/disponibilidadesRepository';
import { AgendamentosController } from './agendamentos.controller';
import { AgendamentosService } from './agendamentos.service';

@Module({
  imports: [SequelizeModule.forFeature([Agendamento])],
  controllers: [AgendamentosController],
  providers: [AgendamentosService, AgendamentosRepository],
  exports: [AgendamentosService],
})
export class AgendamentosModule { }
