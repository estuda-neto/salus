import { Module } from '@nestjs/common';
import { DisponibilidadesService } from './disponibilidades.service';
import { DisponibilidadesController } from './disponibilidades.controller';
import { Disponibilidade } from './entities/disponibilidade.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { DisponibilidadesRepository } from './repository/disponibilidadesRepository';

@Module({
  imports: [SequelizeModule.forFeature([Disponibilidade])],
  controllers: [DisponibilidadesController],
  providers: [DisponibilidadesService, DisponibilidadesRepository],
  exports: [DisponibilidadesService]
})
export class DisponibilidadesModule { }
