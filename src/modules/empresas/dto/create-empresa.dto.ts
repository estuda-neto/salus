import { IsString, IsNotEmpty, IsOptional, IsEnum, IsArray, IsNumber, IsPhoneNumber, IsPostalCode } from 'class-validator';
import { EstadosBrasileiros } from '../utils/enums/estadosbrasileiros';
import { EmpresaStatus } from '../utils/enums/status';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEmpresaDto {
  @ApiProperty({ example: 'Clínica Salus', description: 'Nome fantasia da empresa' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: '12345678000199', description: 'CNPJ da empresa com 14 dígitos numéricos' })
  @IsString()
  cnpj: string;

  @ApiProperty({ example: '+5511999999999', description: 'Telefone válido com DDD (formato E.164)' })
  @IsPhoneNumber('BR')
  telefone: string;

  @ApiPropertyOptional({ type: [String], example: ['https://example.com/imagem1.png'], description: 'URLs de imagens da empresa (opcional)' })
  @IsArray()
  @IsOptional()
  imagens?: string[];

  @ApiProperty({ example: '01001-000', description: 'CEP válido no formato brasileiro' })
  @IsPostalCode('BR')
  cep: string;

  @ApiProperty({ example: 'Av. Paulista', description: 'Nome da rua/avenida da empresa' })
  @IsString()
  @IsNotEmpty()
  rua: string;

  @ApiProperty({ example: 1000, description: 'Número do endereço' })
  @IsNumber()
  numero: number;

  @ApiPropertyOptional({ example: 'Sala 101', description: 'Complemento do endereço (opcional)' })
  @IsString()
  @IsOptional()
  complemento?: string;

  @ApiProperty({ example: 'Bela Vista', description: 'Bairro da empresa' })
  @IsString()
  @IsNotEmpty()
  bairro: string;

  @ApiProperty({
    example: 'São Paulo', description: 'Cidade da empresa',
  })
  @IsString()
  @IsNotEmpty()
  cidade: string;

  @ApiProperty({ enum: EstadosBrasileiros, example: EstadosBrasileiros.SP, description: 'Estado da empresa' })
  @IsEnum(EstadosBrasileiros)
  estado: EstadosBrasileiros;

  @ApiProperty({ enum: EmpresaStatus, example: EmpresaStatus.EM_ANDAMENTO, description: 'Status da empresa no sistema' })
  @IsEnum(EmpresaStatus)
  empresaStatus: EmpresaStatus;
}
