export enum EmpresaStatus {
  EM_ANDAMENTO = 'emandamento',
  FINALIZADO = 'finalizado',
}

export function fromString(value: string): EmpresaStatus {
  switch (value) {
    case 'emandamento':
      return EmpresaStatus.EM_ANDAMENTO;
    case 'finalizado':
      return EmpresaStatus.FINALIZADO;
    default:
      throw new Error('Tipo de usuário inválido.');
  }
}
