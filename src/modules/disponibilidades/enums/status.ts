export enum DisponibilidadeStatus {
    EM_ANDAMENTO = "emandamento",
    FINALIZADO = "finalizado",
}

export function fromString(value: string): DisponibilidadeStatus {
    switch(value) {
        case 'emandamento':
            return DisponibilidadeStatus.EM_ANDAMENTO;
        case 'finalizado':
            return DisponibilidadeStatus.FINALIZADO;
        default:
            throw new Error("Tipo de disponibilidade inválido.");
    }
}