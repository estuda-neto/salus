import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { Preferencia } from '../entities/preferencia.entity';
import { PreferenciaRepository } from '../repositories/preferencias.repository';
import { Op } from 'sequelize';

describe('PreferenciaRepository', () => {
    let repository: PreferenciaRepository;
    let preferenciaModel: typeof Preferencia;

    const mockPreferencias = [
        { preferenciaId: 1, diaSemana: 1, horaInicio: '08:00:00', horaFim: '12:00:00', createdAt: new Date(), updatedAt: new Date(), usuarioId: 42, quadroId: 3 },
        { preferenciaId: 2, diaSemana: 3, horaInicio: '13:00:00', horaFim: '17:00:00', createdAt: new Date(), updatedAt: new Date(), usuarioId: 42, quadroId: 3 },
    ];

    const preferenciaModelMock = {
        findAll: jest.fn(),
        getAttributes: jest.fn().mockReturnValue({ preferenciaId: { primaryKey: true }, usuarioId: {}, diaSemana: {}, horaInicio: {}, horaFim: {}, quadroId: {}, createdAt: {}, updatedAt: {} }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PreferenciaRepository,
                {
                    provide: getModelToken(Preferencia),
                    useValue: preferenciaModelMock,
                },
            ],
        }).compile();

        repository = module.get<PreferenciaRepository>(PreferenciaRepository);
        preferenciaModel = module.get<typeof Preferencia>(getModelToken(Preferencia));
    });

    afterEach(() => { jest.clearAllMocks(); });

    it('should return all options of a user', async () => {
        preferenciaModelMock.findAll.mockResolvedValue(mockPreferencias);

        const result = await repository.findAllPreferenciasOfUsuarioId(42);

        expect(preferenciaModelMock.findAll).toHaveBeenCalledWith({ where: { usuarioId: 42 } });
        expect(result).toEqual(mockPreferencias);
    });

    it('should return preferencias filtered by usuarioIds and date range', async () => {
        const usuarioIds = [42];
        const startDate = new Date('2024-01-01T00:00:00Z');
        const endDate = new Date('2024-01-02T00:00:00Z');

        preferenciaModelMock.findAll.mockResolvedValue(mockPreferencias);

        const result = await repository.findByUsuarioIdsAndDateRange(usuarioIds, startDate, endDate);

        expect(preferenciaModelMock.findAll).toHaveBeenCalledWith({
            where: {
                usuarioId: {
                    [Op.in]: usuarioIds,
                },
                [Op.or]: [{ createdAt: { [Op.between]: [startDate, endDate], }, }, {
                    updatedAt: { [Op.between]: [startDate, endDate], },
                },
                ],
            },
        });
        expect(result).toEqual(mockPreferencias);
    });

});
