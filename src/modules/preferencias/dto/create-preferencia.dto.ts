import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Matches, Max, Min } from "class-validator";

export class CreatePreferenciaDto {
    @ApiProperty({
        example: 1,
        description: 'Dia da semana (0 = Domingo, 1 = Segunda, ..., 6 = Sábado)',
    })
    @IsInt()
    @Min(0)
    @Max(6)
    diaSemana: number;

    @ApiProperty({
        example: '08:00:00',
        description: 'Hora de início no formato HH:mm:ss',
    })
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: 'horaInicio deve estar no formato HH:mm:ss',
    })
    horaInicio: string;

    @ApiProperty({
        example: '12:00:00',
        description: 'Hora de fim no formato HH:mm:ss',
    })
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: 'horaFim deve estar no formato HH:mm:ss',
    })
    horaFim: string;

    @ApiProperty({
        example: 5,
        description: 'ID do usuário (opcional)',
        required: false,
    })
    @IsOptional()
    @IsInt()
    usuarioId?: number;

    @ApiProperty({
        example: 2,
        description: 'ID do quadro (opcional)',
        required: false,
    })
    @IsOptional()
    @IsInt()
    quadroId?: number;
}
