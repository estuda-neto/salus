import { Module } from '@nestjs/common';
import { CompromissosService } from './compromissos.service';
import { CompromissosController } from './compromissos.controller';
import { Compromisso } from './entities/compromisso.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompromissosRepository } from './repository/compromissosRepository';

@Module({
  imports: [SequelizeModule.forFeature([Compromisso])],
  controllers: [CompromissosController],
  providers: [CompromissosService, CompromissosRepository],
  exports: [CompromissosService]
})
export class CompromissosModule { }
