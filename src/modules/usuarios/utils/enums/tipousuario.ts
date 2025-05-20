export enum TipoUsuario {
    PACIENTE = "paciente",
    ADMIN = "admin",
    FUNCIONARIO = "funcionario",
    PROFISSIONAL = "profissional",
}

export function fromString(value: string): TipoUsuario {
    switch(value) {
        case 'paciente':
            return TipoUsuario.PACIENTE;
        case 'admin':
            return TipoUsuario.ADMIN;
        case 'funcionario':
            return TipoUsuario.FUNCIONARIO;
        case 'profissional':
            return TipoUsuario.PROFISSIONAL;
        default:
            throw new Error("Tipo de usuário inválido.");
    }
}