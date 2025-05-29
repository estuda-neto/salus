import { validate } from 'class-validator';
import { CreateQuadroDto } from '../dto/create-quadro.dto';

describe('CreateQuadroDto', () => {
  it('deve validar dto com dados corretos', async () => {
    const dto = new CreateQuadroDto();
    dto.dataAprovacao = new Date('2024-12-31T00:00:00.000Z'); // Date válido
    dto.status = 'ativo';
    dto.empresaId = 1;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve falhar se dataAprovacao não for uma data válida', async () => {
    const dto = new CreateQuadroDto();
    // Para simular data inválida, criamos Date inválido
    dto.dataAprovacao = new Date('31/12/2024'); // inválido: resulta em "Invalid Date"
    dto.status = 'ativo';
    dto.empresaId = 1;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.property === 'dataAprovacao')).toBe(true);
  });

  it('deve aceitar status vazio (opcional)', async () => {
    const dto = new CreateQuadroDto();
    dto.dataAprovacao = new Date('2024-12-31T00:00:00.000Z');

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve falhar se status não estiver entre os valores permitidos', async () => {
    const dto = new CreateQuadroDto();
    dto.dataAprovacao = new Date('2024-12-31T00:00:00.000Z');
    // @ts-ignore: forçar valor inválido para teste
    dto.status = 'pendente';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.property === 'status')).toBe(true);
  });

  it('deve aceitar empresaId vazio (opcional)', async () => {
    const dto = new CreateQuadroDto();
    dto.dataAprovacao = new Date('2024-12-31T00:00:00.000Z');

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('deve falhar se empresaId for negativo ou zero', async () => {
    const dto = new CreateQuadroDto();
    dto.dataAprovacao = new Date('2024-12-31T00:00:00.000Z');
    dto.empresaId = 0;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.property === 'empresaId')).toBe(true);
  });

  it('deve falhar se empresaId não for inteiro', async () => {
    const dto = new CreateQuadroDto();
    dto.dataAprovacao = new Date('2024-12-31T00:00:00.000Z');
    // @ts-ignore: para teste forçado
    dto.empresaId = 'abc';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.property === 'empresaId')).toBe(true);
  });
});
