import { Test, TestingModule } from '@nestjs/testing';
import { PreferenciasService } from '../preferencias.service';
import { PreferenciaRepository } from '../repositories/preferencias.repository';
import { Preferencia } from '../entities/preferencia.entity';

describe('PreferenciasService', () => {
    let service: PreferenciasService;
    let repository: PreferenciaRepository;

    const mockPreferencias: Preferencia[] = [
        {
            preferenciaId: 1, diaSemana: 1, horaInicio: '08:00:00', horaFim: '12:00:00', createdAt: new Date(), updatedAt: new Date(), usuarioId: 42, quadroId: 3, usuario: null, quadro: null,
        } as unknown as Preferencia,
        {
            preferenciaId: 2, diaSemana: 3, horaInicio: '13:00:00', horaFim: '17:00:00', createdAt: new Date(), updatedAt: new Date(), usuarioId: 42, quadroId: 3, usuario: null, quadro: null,
        } as unknown as Preferencia,
    ];

    const preferenciaRepositoryMock = {
        findAllPreferenciasOfUsuarioId: jest.fn(),
        findByUsuarioIdsAndDateRange: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PreferenciasService,
                {
                    provide: PreferenciaRepository,
                    useValue: preferenciaRepositoryMock,
                },
            ],
        }).compile();

        service = module.get<PreferenciasService>(PreferenciasService);
        repository = module.get<PreferenciaRepository>(PreferenciaRepository);

        jest.clearAllMocks();
    });

    it('should return user preferences', async () => {
        preferenciaRepositoryMock.findAllPreferenciasOfUsuarioId.mockResolvedValue(mockPreferencias);

        const result = await service.findAllPreferenciasOfUsuarioId(42);

        expect(preferenciaRepositoryMock.findAllPreferenciasOfUsuarioId).toHaveBeenCalledWith(42);
        expect(result).toEqual(mockPreferencias);
    });

    it('should return empty array when there is no preference', async () => {
        preferenciaRepositoryMock.findAllPreferenciasOfUsuarioId.mockResolvedValue([]);

        const result = await service.findAllPreferenciasOfUsuarioId(123);

        expect(preferenciaRepositoryMock.findAllPreferenciasOfUsuarioId).toHaveBeenCalledWith(123);
        expect(result).toEqual([]);
    })

    it('should return preferencias by userIds and date range', async () => {
        const usuarioIds = [42];
        const startDate = new Date('2024-01-01T00:00:00Z');
        const endDate = new Date('2024-01-02T00:00:00Z');

        preferenciaRepositoryMock.findByUsuarioIdsAndDateRange.mockResolvedValue(mockPreferencias);

        const result = await service.findByIdsAndDateRange(usuarioIds, startDate, endDate);

        expect(preferenciaRepositoryMock.findByUsuarioIdsAndDateRange).toHaveBeenCalledWith(usuarioIds, startDate, endDate);
        expect(result).toEqual(mockPreferencias);
    });

});
