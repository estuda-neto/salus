import { Test, TestingModule } from '@nestjs/testing';
import { QuadrosController } from '../quadros.controller';
import { QuadrosService } from '../quadros.service';
import { Quadro } from '../entities/quadro.entity';
import { CreateQuadroDto } from '../dto/create-quadro.dto';
import { UpdateQuadroDto } from '../dto/update-quadro.dto';

describe('QuadrosController', () => {
  let controller: QuadrosController;
  let service: QuadrosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuadrosController],
      providers: [
        {
          provide: QuadrosService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<QuadrosController>(QuadrosController);
    service = module.get<QuadrosService>(QuadrosService);
  });

  it('should return all quadros', async () => {
    const quadros: Quadro[] = [{ quadroId: 1, status: 'ativo' } as Quadro];
    jest.spyOn(service, 'findAll').mockResolvedValue(quadros);

    const result = await controller.findAll();

    expect(result).toEqual(quadros);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should create a quadro', async () => {
    const dto: CreateQuadroDto = { dataAprovacao: new Date() };
    const created: Quadro = { quadroId: 2, status: 'ativo', dataAprovacao: dto.dataAprovacao } as unknown as Quadro;

    jest.spyOn(service, 'create').mockResolvedValueOnce(created);

    const result = await controller.create(dto);

    expect(result).toEqual(created);
    expect(service.create).toHaveBeenCalledWith(dto);
  });


  it('should return one quadro by ID', async () => {
    const quadro: Quadro = { quadroId: 1, status: 'ativo' } as Quadro;

    jest.spyOn(service, 'findOne').mockResolvedValue(quadro);

    const result = await controller.findOne(1);

    expect(result).toEqual(quadro);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a quadro and return affected rows and updated objects', async () => {
    const dto: UpdateQuadroDto = { status: 'inativo' };
    const expectedResponse: [number, Quadro[]] = [1, [{ quadroId: 1, status: 'inativo' } as Quadro]];

    jest.spyOn(service, 'update').mockResolvedValue(expectedResponse);

    const result = await controller.update(1, dto);

    expect(result).toEqual(expectedResponse);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('should delete a quadro and return its ID', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(1);

    const result = await controller.remove(1);

    expect(result).toBe(1);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
