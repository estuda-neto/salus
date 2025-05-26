import { Test, TestingModule } from '@nestjs/testing';
import { EmpresasService } from '../empresas.service';
import { EmpresasRepository } from '../repository/empresasRepository';
import { UpdateStatusEmpresaDto } from '../dto/update-status-empresa.dto';
import { Empresa } from '../entities/empresa.entity';
import { EmpresaStatus } from '../utils/enums/status';

describe('EmpresasService', () => {
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
        estado: 'SP',
        empresaStatus: EmpresaStatus.EM_ANDAMENTO,
        usuarios: [],
        servicos: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    } as unknown as Empresa;

    const mockUpdateResult: [number, Empresa[]] = [1, [mockEmpresa]];
    const mockEmpresasRepository = {update: jest.fn().mockResolvedValue(mockUpdateResult)};

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EmpresasService,
                {
                    provide: EmpresasRepository,
                    useValue: mockEmpresasRepository,
                },
            ],
        }).compile();

        service = module.get<EmpresasService>(EmpresasService);
        // Mockar findOne (que vem da BaseService)
        jest.spyOn(service, 'findOne').mockResolvedValue(mockEmpresa);
    });

    it('should update empresa status', async () => {
        const dto: UpdateStatusEmpresaDto = { empresaStatus: EmpresaStatus.EM_ANDAMENTO };
        const id = 1;

        const result = await service.updateStatus(id, dto);

        expect(service.findOne).toHaveBeenCalledWith(id);
        expect(mockEmpresasRepository.update).toHaveBeenCalledWith(id, dto);
        expect(result).toEqual(mockUpdateResult);
    });
});
