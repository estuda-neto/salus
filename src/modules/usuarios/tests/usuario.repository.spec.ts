import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { UsuarioRepository } from '../repositories/usuarios.repository';
import { Usuario } from '../entities/usuario.entity';
import { TipoUsuario } from '../utils/enums/tipousuario';

describe('UsuarioRepository', () => {
    let repository: UsuarioRepository;

    const mockUsuarioModel = {
        create: jest.fn(),
        findOne: jest.fn(),
        findAll: jest.fn(),
        getAttributes: jest.fn().mockReturnValue({usuarioId: { primaryKey: true },email: {},tipoUsuario: {},empresaId: {}}),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsuarioRepository,
                {
                    provide: getModelToken(Usuario),
                    useValue: mockUsuarioModel,
                },
            ],
        }).compile();

        repository = module.get<UsuarioRepository>(UsuarioRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new user', async () => {
        const dto = { email: 'user@test.com', tipoUsuario: TipoUsuario.ADMIN };
        const expectedUser = { id: 1, ...dto };

        mockUsuarioModel.create.mockResolvedValue(expectedUser);

        const result = await repository.criar(dto as any);

        expect(mockUsuarioModel.create).toHaveBeenCalledWith(dto);
        expect(result).toEqual(expectedUser);
    });

    it('should return a user by email', async () => {
        const email = 'user@test.com';
        const expectedUser = { id: 1, email };

        mockUsuarioModel.findOne.mockResolvedValue(expectedUser);

        const result = await repository.buscarPorEmail(email);

        expect(mockUsuarioModel.findOne).toHaveBeenCalledWith({ where: { email } });
        expect(result).toEqual(expectedUser);
    });

    it('should return users by type', async () => {
        const tipo = TipoUsuario.PROFISSIONAL;
        const expectedUsers = [{ id: 1, tipoUsuario: tipo }];

        mockUsuarioModel.findAll.mockResolvedValue(expectedUsers);

        const result = await repository.buscarPorTipo(tipo);

        expect(mockUsuarioModel.findAll).toHaveBeenCalledWith({ where: { tipoUsuario: tipo } });
        expect(result).toEqual(expectedUsers);
    });

    it('should return professional user IDs by company ID', async () => {
        const empresaId = 99;
        const expectedData = [{ usuarioId: 10 }, { usuarioId: 20 }];
        const expectedIds = [10, 20];

        mockUsuarioModel.findAll.mockResolvedValue(expectedData);

        const result = await repository.findProfissionalsIdsByEmpresaIdAndTipoAdmin(empresaId);

        expect(mockUsuarioModel.findAll).toHaveBeenCalledWith({
            where: { empresaId, tipoUsuario: 'profissional' },
            attributes: ['usuarioId'],
            raw: true,
        });

        expect(result).toEqual(expectedIds);
    });
});
