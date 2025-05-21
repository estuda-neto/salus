export enum EstadosBrasileiros {
    AC = "Acre",
    AL = "Alagoas",
    AP = "Amapá",
    AM = "Amazonas",
    BA = "Bahia",
    CE = "Ceará",
    DF = "Distrito Federal",
    ES = "Espírito Santo",
    GO = "Goiás",
    MA = "Maranhão",
    MT = "Mato Grosso",
    MS = "Mato Grosso do Sul",
    MG = "Minas Gerais",
    PA = "Pará",
    PB = "Paraíba",
    PR = "Paraná",
    PE = "Pernambuco",
    PI = "Piauí",
    RJ = "Rio de Janeiro",
    RN = "Rio Grande do Norte",
    RS = "Rio Grande do Sul",
    RO = "Rondônia",
    RR = "Roraima",
    SC = "Santa Catarina",
    SP = "São Paulo",
    SE = "Sergipe",
    TO = "Tocantins"
}

export function fromString(value: string): EstadosBrasileiros {
    switch (value) {
        case 'Acre': return EstadosBrasileiros.AC;
        case 'Alagoas': return EstadosBrasileiros.AL;
        case 'Amapá': return EstadosBrasileiros.AP;
        case 'Amazonas': return EstadosBrasileiros.AM;
        case 'Bahia': return EstadosBrasileiros.BA;
        case 'Ceará': return EstadosBrasileiros.CE;
        case 'Distrito Federal': return EstadosBrasileiros.DF;
        case 'Espírito Santo': return EstadosBrasileiros.ES;
        case 'Goiás': return EstadosBrasileiros.GO;
        case 'Maranhão': return EstadosBrasileiros.MA;
        case 'Mato Grosso': return EstadosBrasileiros.MT;
        case 'Mato Grosso do Sul': return EstadosBrasileiros.MS;
        case 'Minas Gerais': return EstadosBrasileiros.MG;
        case 'Pará': return EstadosBrasileiros.PA;
        case 'Paraíba': return EstadosBrasileiros.PB;
        case 'Paraná': return EstadosBrasileiros.PR;
        case 'Pernambuco': return EstadosBrasileiros.PE;
        case 'Piauí': return EstadosBrasileiros.PI;
        case 'Rio de Janeiro': return EstadosBrasileiros.RJ;
        case 'Rio Grande do Norte': return EstadosBrasileiros.RN;
        case 'Rio Grande do Sul': return EstadosBrasileiros.RS;
        case 'Rondônia': return EstadosBrasileiros.RO;
        case 'Roraima': return EstadosBrasileiros.RR;
        case 'Santa Catarina': return EstadosBrasileiros.SC;
        case 'São Paulo': return EstadosBrasileiros.SP;
        case 'Sergipe': return EstadosBrasileiros.SE;
        case 'Tocantins': return EstadosBrasileiros.TO;
        default:
            throw new Error("Tipo de estado inválido.");
    }
}