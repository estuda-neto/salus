import { EmpresaStatus } from '../utils/enums/status';
import { EstadosBrasileiros } from '../utils/enums/estadosbrasileiros';
import { Empresa } from '../entities/empresa.entity';

describe('Empresa - Entity', () => {
    const mockEmpresa: Partial<Empresa> = {
        empresaId: 1,
        nome: 'Empresa Teste',
        cnpj: '12.345.678/0001-90',
        telefone: '(11) 99999-9999',
        imagens: ['img1.png', 'img2.png'],
        cep: '01000-000',
        rua: 'Rua Teste',
        numero: 123,
        complemento: 'Sala 1',
        bairro: 'Bairro Legal',
        cidade: 'Cidade Exemplo',
        estado: EstadosBrasileiros.SP,
        empresaStatus: EmpresaStatus.FINALIZADO,
    };

    it('must contain all expected attributes', () => {
        const atributosEsperados = ['empresaId', 'nome', 'cnpj', 'telefone', 'imagens', 'cep', 'rua', 'numero', 'complemento', 'bairro', 'cidade', 'estado', 'empresaStatus'];

        for (const atributo of atributosEsperados) {
            expect(mockEmpresa).toHaveProperty(atributo);
        }
    });

    it('must have the correct types assigned', () => {
        expect(typeof mockEmpresa.empresaId).toBe('number');
        expect(typeof mockEmpresa.nome).toBe('string');
        expect(typeof mockEmpresa.cnpj).toBe('string');
        expect(typeof mockEmpresa.telefone).toBe('string');
        expect(Array.isArray(mockEmpresa.imagens)).toBe(true);
        expect(typeof mockEmpresa.cep).toBe('string');
        expect(typeof mockEmpresa.rua).toBe('string');
        expect(typeof mockEmpresa.numero).toBe('number');
        expect(typeof mockEmpresa.complemento).toBe('string');
        expect(typeof mockEmpresa.bairro).toBe('string');
        expect(typeof mockEmpresa.cidade).toBe('string');
        expect(Object.values(EstadosBrasileiros)).toContain(mockEmpresa.estado);
        expect(Object.values(EmpresaStatus)).toContain(mockEmpresa.empresaStatus);
    });
});
