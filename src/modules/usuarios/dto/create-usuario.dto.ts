import {IsEmail,IsEnum,IsNotEmpty,IsString,Length,Matches} from 'class-validator';
import { TipoUsuario } from '../utils/enums/tipousuario';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do usuário',
  })
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório.' })
  nome: string;

  @ApiProperty({ example: '12345678901', description: 'CPF com 11 dígitos' })
  @IsString()
  @Matches(/^\d{11}$/, {
    message: 'CPF deve conter exatamente 11 dígitos numéricos.',
  })
  cpf: string;

  @ApiProperty({ example: 'joao@email.com', description: 'Email válido' })
  @IsEmail({}, { message: 'E-mail inválido.' })
  email: string;

  @ApiProperty({
    example: 'senha123',
    description: 'Senha com 6 a 20 caracteres',
  })
  @IsString()
  @Length(6, 20, { message: 'A senha deve ter entre 6 e 20 caracteres.' })
  password: string;

  @ApiProperty({
    example: '11999999999',
    description: 'Telefone com 10 ou 11 dígitos',
  })
  @IsString()
  @Matches(/^\d{10,11}$/, {
    message: 'Telefone deve conter 10 ou 11 dígitos numéricos.',
  })
  telefone: string;

  @ApiProperty({
    example: 'Rua das Flores, 123',
    description: 'Endereço completo',
  })
  @IsString()
  @IsNotEmpty({ message: 'Endereço é obrigatório.' })
  endereco: string;
  @ApiProperty({
    enum: ['admin', 'paciente', 'profissional', 'funcionario'],
    description: 'Tipo de usuário',
  })
  @IsEnum(TipoUsuario, {
    message: `Tipo de usuário inválido. Valores permitidos: ${Object.values(TipoUsuario).join(', ')}`,
  })
  tipoUsuario: TipoUsuario;
}
