import { validate } from 'class-validator';
import { CreateEmpresaDto } from '../dto/create-empresa.dto';
import { EstadosBrasileiros } from '../utils/enums/estadosbrasileiros';
import { EmpresaStatus } from '../utils/enums/status';

describe('CreateEmpresaDto', () => {
  let dto: CreateEmpresaDto;

  beforeEach(() => {
    dto = new CreateEmpresaDto();
    dto.nome = 'Clínica Salus';
    dto.cnpj = '12345678000199';
    dto.telefone = '+5511999999999';
    dto.imagens = ['https://example.com/imagem1.png'];
    dto.cep = '01001-000';
    dto.rua = 'Av. Paulista';
    dto.numero = 1000;
    dto.complemento = 'Sala 101';
    dto.bairro = 'Bela Vista';
    dto.cidade = 'São Paulo';
    dto.estado = EstadosBrasileiros.SP;
    dto.empresaStatus = EmpresaStatus.EM_ANDAMENTO;
  });

  it('should validate a valid dto without errors', async () => {
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should require nome', async () => {
    dto.nome = '';
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'nome')).toBeTruthy();
  });

  it('should require rua', async () => {
    dto.rua = '';
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'rua')).toBeTruthy();
  });

  it('should require bairro', async () => {
    dto.bairro = '';
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'bairro')).toBeTruthy();
  });

  it('should require cidade', async () => {
    dto.cidade = '';
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'cidade')).toBeTruthy();
  });

  it('should fail for invalid telefone', async () => {
    dto.telefone = '12345';
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'telefone')).toBeTruthy();
  });

  it('should fail for invalid cep', async () => {
    dto.cep = 'invalid';
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'cep')).toBeTruthy();
  });

  it('should fail for invalid estado enum', async () => {
    dto.estado = 'XX' as EstadosBrasileiros;
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'estado')).toBeTruthy();
  });

  it('should fail for invalid empresaStatus enum', async () => {
    dto.empresaStatus = 'INVALID' as EmpresaStatus;
    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'empresaStatus')).toBeTruthy();
  });

  it('should allow complemento and imagens to be optional', async () => {
    dto.complemento = undefined;
    dto.imagens = undefined;
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
