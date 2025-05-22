export enum TipoServico {
  EXAME = 'exame',
  CONSULTA = 'consulta',
}

export function fromString(value: string): TipoServico {
  switch (value) {
    case 'exame':
      return TipoServico.EXAME;
    case 'consulta':
      return TipoServico.CONSULTA;
    default:
      throw new Error('Tipo de serviço inválido.');
  }
}
