export enum AgendamentoStatus {
  EM_ANDAMENTO = 'emandamento',
  FINALIZADO = 'finalizado',
}

export function fromString(value: string): AgendamentoStatus {
  switch (value) {
    case 'emandamento':
      return AgendamentoStatus.EM_ANDAMENTO;
    case 'finalizado':
      return AgendamentoStatus.FINALIZADO;
    default:
      throw new Error('Tipo de disponibilidade inválido.');
  }
}
