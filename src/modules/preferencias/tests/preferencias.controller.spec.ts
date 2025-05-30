import { Test, TestingModule } from '@nestjs/testing';
import { PreferenciasController } from '../preferencias.controller';
import { PreferenciasService } from '../preferencias.service';
import { JwtAuthGuard } from 'src/modules/usuarios/utils/guards/jwt.guard';
import { RolesGuard } from 'src/modules/usuarios/utils/guards/roles.guard';
import { Preferencia } from '../entities/preferencia.entity';
import { CreatePreferenciaDto } from '../dto/create-preferencia.dto';
import { UpdatePreferenciaDto } from '../dto/update-preferencia.dto';
import { BadRequestException } from '@nestjs/common';

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
            findAllPreferenciasOfUsuarioId: jest.fn(),
            findByIdsAndDateRange: jest.fn(),
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

  it('should return all preferences of a user', async () => {
    const usuarioId = 1;
    const preferenciasMock = [
      {
        preferenciaId: 1, diaSemana: 1, horaInicio: '08:00:00', horaFim: '12:00:00',
        createdAt: new Date(),
        updatedAt: new Date(),
        usuarioId, quadroId: 1, usuario: {} as any, quadro: {} as any,
      } as unknown as Preferencia,
    ];

    jest.spyOn(service, 'findAllPreferenciasOfUsuarioId').mockResolvedValue(preferenciasMock);

    const result = await controller.findAllPreferenciasOfUsuarioId(usuarioId);
    expect(result).toEqual(preferenciasMock);
    expect(service.findAllPreferenciasOfUsuarioId).toHaveBeenCalledWith(usuarioId);
  });

  it('should return preferences filtered by date and user list', async () => {
    const ids = [1, 2];
    const startDate = '2024-01-01T00:00:00Z';
    const endDate = '2024-01-31T23:59:59Z';

    const mockResult = [
      {
        preferenciaId: 1,
        diaSemana: 1,
        horaInicio: '08:00:00',
        horaFim: '12:00:00',
        createdAt: new Date(startDate),
        updatedAt: new Date(endDate),
        usuarioId: 1,
        quadroId: 1,
        usuario: null,
        quadro: null,
      } as unknown as Preferencia,
    ];

    jest.spyOn(service, 'findByIdsAndDateRange').mockResolvedValue(mockResult);

    const result = await controller.getPreferencesByDate(ids, startDate, endDate);

    expect(result).toEqual(mockResult);
    expect(service.findByIdsAndDateRange).toHaveBeenCalledWith(ids, new Date(startDate), new Date(endDate));
  });

  it('should throw an exception if startDate or endDate are missing', async () => {
    await expect(controller.getPreferencesByDate([1, 2], '', '2024-01-01')).rejects.toThrow(BadRequestException);

    await expect(controller.getPreferencesByDate([1, 2], '2024-01-01', '')).rejects.toThrow(BadRequestException);
  });

  it('should throw an exception if startDate or endDate are invalid', async () => {
    await expect(controller.getPreferencesByDate([1], 'data-invalida', '2024-01-01')).rejects.toThrow(BadRequestException);

    await expect(controller.getPreferencesByDate([1], '2024-01-01', 'outra-invalida')).rejects.toThrow(BadRequestException);
  });
});
