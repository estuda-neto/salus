import { Test, TestingModule } from '@nestjs/testing';
import { CompromissosController } from './compromissos.controller';
import { CompromissosService } from './compromissos.service';

describe('CompromissosController', () => {
  let controller: CompromissosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompromissosController],
      providers: [CompromissosService],
    }).compile();

    controller = module.get<CompromissosController>(CompromissosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
