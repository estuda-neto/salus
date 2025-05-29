import { Quadro } from '../entities/quadro.entity';

describe('Quadro - Entity', () => {
  const mockQuadro: Partial<Quadro> = {
    quadroId: 1,
    dataAprovacao: new Date('2024-01-01'),
    status: 'ativo',
    createdAt: new Date(),
    updatedAt: new Date(),
    empresaId: 101,
    preferencias: [],
    agendamentos: [],
  };

  it('must contain all expected attributes', () => {
    const atributosEsperados = ['quadroId','dataAprovacao','status','createdAt','updatedAt','empresaId','preferencias','agendamentos'];

    for (const atributo of atributosEsperados) {
      expect(mockQuadro).toHaveProperty(atributo);
    }
  });

  it('must have the correct types assigned', () => {
    expect(typeof mockQuadro.quadroId).toBe('number');
    expect(mockQuadro.dataAprovacao).toBeInstanceOf(Date);
    expect(typeof mockQuadro.status).toBe('string');
    expect(['ativo', 'inativo']).toContain(mockQuadro.status);
    expect(mockQuadro.createdAt).toBeInstanceOf(Date);
    expect(mockQuadro.updatedAt).toBeInstanceOf(Date);
    expect(typeof mockQuadro.empresaId).toBe('number');
    expect(Array.isArray(mockQuadro.preferencias)).toBe(true);
    expect(Array.isArray(mockQuadro.agendamentos)).toBe(true);
  });
});
