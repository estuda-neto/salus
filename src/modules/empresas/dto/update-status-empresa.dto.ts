import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpresaDto } from './create-empresa.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { EmpresaStatus } from '../utils/enums/status';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusEmpresaDto extends PartialType(CreateEmpresaDto) {
    @ApiProperty({
        enum: EmpresaStatus,
        example: EmpresaStatus.FINALIZADO,
        description: 'Novo status da empresa no sistema',
    })
    @IsEnum(EmpresaStatus)
    @IsNotEmpty()
    empresaStatus: EmpresaStatus;
}
