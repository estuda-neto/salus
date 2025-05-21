export enum CompromissoStatus {
    EM_ANDAMENTO = "emandamento",
    FINALIZADO = "finalizado",
}

export function fromString(value: string): CompromissoStatus {
    switch(value) {
        case 'emandamento':
            return CompromissoStatus.EM_ANDAMENTO;
        case 'finalizado':
            return CompromissoStatus.FINALIZADO;
        default:
            throw new Error("Tipo de disponibilidade inválido.");
    }
}