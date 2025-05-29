import { Test, TestingModule } from '@nestjs/testing';
import { PreferenciasController } from '../preferencias.controller';
import { PreferenciasService } from '../preferencias.service';
import { JwtAuthGuard } from 'src/modules/usuarios/utils/guards/jwt.guard';
import { RolesGuard } from 'src/modules/usuarios/utils/guards/roles.guard';
import { Preferencia } from '../entities/preferencia.entity';
import { CreatePreferenciaDto } from '../dto/create-preferencia.dto';
import { UpdatePreferenciaDto } from '../dto/update-preferencia.dto';

describe('PreferenciasController', () => {
  let controller: PreferenciasController;
  let service: PreferenciasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreferenciasController],
      providers: [
        {
          provide: PreferenciasService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<PreferenciasController>(PreferenciasController);
    service = module.get<PreferenciasService>(PreferenciasService);
  });

  it('should return all preferences', async () => {
    const preferencias: Preferencia[] = [
      {
        preferenciaId: 1, diaSemana: 1, horaInicio: '08:00:00', horaFim: '12:00:00', createdAt: new Date(), updatedAt: new Date(), usuarioId: 10, quadroId: 5, usuario: null, quadro: null,
      } as unknown as Preferencia,
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(preferencias);

    const result = await controller.findAll();

    expect(result).toEqual(preferencias);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should create a preference', async () => {
    const dto: CreatePreferenciaDto = {
      diaSemana: 2, horaInicio: '09:00:00', horaFim: '11:00:00', usuarioId: 20, quadroId: 10,
    };

    const created: Preferencia = { preferenciaId: 2, ...dto, createdAt: new Date(), updatedAt: new Date(), usuario: null, quadro: null } as unknown as Preferencia;

    jest.spyOn(service, 'create').mockResolvedValue(created);

    const result = await controller.create(dto);

    expect(result).toEqual(created);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return one preference by ID', async () => {
    const preferencia: Preferencia = {
      preferenciaId: 1, diaSemana: 3, horaInicio: '10:00:00', horaFim: '14:00:00', createdAt: new Date(), updatedAt: new Date(), usuarioId: 30, quadroId: 15, usuario: null, quadro: null,
    } as unknown as Preferencia;

    jest.spyOn(service, 'findOne').mockResolvedValue(preferencia);

    const result = await controller.findOne(1);

    expect(result).toEqual(preferencia);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a preference and return affected rows and updated objects', async () => {
    const dto: UpdatePreferenciaDto = {
      horaInicio: '13:00:00',
      horaFim: '17:00:00',
    };

    const updatedPreferencia: Preferencia = {
      preferenciaId: 1, diaSemana: 3, horaInicio: '13:00:00', horaFim: '17:00:00', createdAt: new Date(), updatedAt: new Date(), usuarioId: 30, quadroId: 15, usuario: null, quadro: null,
    } as unknown as Preferencia;

    const expectedResponse: [number, Preferencia[]] = [1, [updatedPreferencia]];

    jest.spyOn(service, 'update').mockResolvedValue(expectedResponse);

    const result = await controller.update(1, dto);

    expect(result).toEqual(expectedResponse);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('should delete a preference and return its ID', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(1);

    const result = await controller.remove(1);

    expect(result).toBe(1);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
