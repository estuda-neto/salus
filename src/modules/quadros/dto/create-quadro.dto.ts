import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsInt, IsOptional, Min } from "class-validator";

export class CreateQuadroDto {
    @ApiProperty({ example: '2024-12-31T00:00:00.000Z', description: 'Data de aprovação do quadro no formato ISO 8601' })
    @Type(() => Date)
    @IsDate()
    dataAprovacao: Date;

    @ApiProperty({ example: 'ativo', description: "Status do quadro ('ativo' ou 'inativo')", enum: ['ativo', 'inativo'], default: 'ativo' })
    @IsEnum(['ativo', 'inativo'])
    @IsOptional()
    status?: 'ativo' | 'inativo';

    @ApiProperty({ example: 1, description: 'ID da empresa associada (opcional)', required: false })
    @IsOptional()
    @IsInt()
    @Min(1)
    empresaId?: number;
}
