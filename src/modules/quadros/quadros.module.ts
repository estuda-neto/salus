import { Module } from '@nestjs/common';
import { QuadrosService } from './quadros.service';
import { QuadrosController } from './quadros.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quadro } from './entities/quadro.entity';
import { QuadroRepository } from './repositories/preferencias.repository';

@Module({
  imports: [SequelizeModule.forFeature([Quadro])],
  controllers: [QuadrosController],
  providers: [QuadrosService, QuadroRepository],
  exports: [QuadrosService],
})
export class QuadrosModule { }
