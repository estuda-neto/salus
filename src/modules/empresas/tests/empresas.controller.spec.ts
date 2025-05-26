import { Test, TestingModule } from '@nestjs/testing';
import { EmpresasController } from '../empresas.controller';
import { EmpresasService } from '../empresas.service';
import { Empresa } from '../entities/empresa.entity';
import { CreateEmpresaDto } from '../dto/create-empresa.dto';
import { UpdateEmpresaDto } from '../dto/update-empresa.dto';
import { EstadosBrasileiros } from '../utils/enums/estadosbrasileiros';
import { EmpresaStatus } from '../utils/enums/status';
import { UpdateStatusEmpresaDto } from '../dto/update-status-empresa.dto';

//testing the methods
describe('EmpresasController', () => {
    let controller: EmpresasController;
    let service: EmpresasService;

    const mockEmpresa: Empresa = {
        empresaId: 1,
        nome: 'Empresa Teste',
        cnpj: '12345678901234',
        telefone: '11999999999',
        imagens: [],
        cep: '12345-678',
        rua: 'Rua Exemplo',
        numero: 123,
        complemento: 'Sala 1',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: EstadosBrasileiros.SP,
        empresaStatus: EmpresaStatus.FINALIZADO,
        usuarios: [],
        servicos: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    } as unknown as Empresa;

    const mockEmpresasService = {
        create: jest.fn().mockResolvedValue(mockEmpresa),
        findAll: jest.fn().mockResolvedValue([mockEmpresa]),
        findOne: jest.fn().mockResolvedValue(mockEmpresa),
        update: jest.fn().mockResolvedValue([1, [mockEmpresa]]),
        remove: jest.fn().mockResolvedValue(1),
        updateStatus: jest.fn().mockResolvedValue([1, [mockEmpresa]]),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EmpresasController],
            providers: [
                {
                    provide: EmpresasService,
                    useValue: mockEmpresasService,
                },
            ],
        }).compile();

        controller = module.get<EmpresasController>(EmpresasController);
        service = module.get<EmpresasService>(EmpresasService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a new empresa', async () => {
        const dto: CreateEmpresaDto = { nome: 'Empresa Teste', cnpj: '12345678901234', telefone: '11999999999', imagens: [], cep: '12345-678', rua: 'Rua Exemplo', numero: 123, complemento: 'Sala 1', bairro: 'Centro', cidade: 'São Paulo', estado: EstadosBrasileiros.SP, empresaStatus: EmpresaStatus.FINALIZADO };
        const result = await controller.create(dto);
        expect(result).toEqual(mockEmpresa);
        expect(service.create).toHaveBeenCalledWith(dto);
    });

    it('should return an array of empresas', async () => {
        const result = await controller.findAll();
        expect(result).toEqual([mockEmpresa]);
        expect(service.findAll).toHaveBeenCalled();
    });

    it('should return a single empresa', async () => {
        const result = await controller.findOne(1);
        expect(result).toEqual(mockEmpresa);
        expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should update the empresa', async () => {
        const dto: UpdateEmpresaDto = {
            nome: 'Empresa Atualizada',
            telefone: '11888888888',
        };
        const result = await controller.update(1, dto);
        expect(result).toEqual([1, [mockEmpresa]]);
        expect(service.update).toHaveBeenCalledWith(1, dto);
    });

    it('should remove the empresa', async () => {
        const result = await controller.remove(1);
        expect(result).toBe(1);
        expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('must be able to specifically update the company status', async () => {
        const dto: UpdateStatusEmpresaDto = { empresaStatus: EmpresaStatus.FINALIZADO };
        const result = await controller.updateStatus(1, dto);
        expect(result).toEqual([1, [mockEmpresa]]);
        expect(service.updateStatus).toHaveBeenCalledWith(1, dto);
    });

});