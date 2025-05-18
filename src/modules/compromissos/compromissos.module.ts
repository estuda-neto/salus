import { Module } from '@nestjs/common';
import { CompromissosService } from './compromissos.service';
import { CompromissosController } from './compromissos.controller';

@Module({
  controllers: [CompromissosController],
  providers: [CompromissosService],
})
export class CompromissosModule {}
