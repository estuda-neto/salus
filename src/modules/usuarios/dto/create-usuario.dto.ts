import { IsEmail, IsEnum, IsNotEmpty, IsString, Length, Matches } from "class-validator";
import { TipoUsuario } from "../utils/enums/tipousuario";

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty({ message: 'Nome é obrigatório.' })
    nome: string;

    @IsString()
    @Matches(/^\d{11}$/, { message: 'CPF deve conter exatamente 11 dígitos numéricos.' })
    cpf: string;

    @IsEmail({}, { message: 'E-mail inválido.' })
    email: string;

    @IsString()
    @Length(6, 20, { message: 'A senha deve ter entre 6 e 20 caracteres.' })
    password: string;

    @IsString()
    @Matches(/^\d{10,11}$/, { message: 'Telefone deve conter 10 ou 11 dígitos numéricos.' })
    telefone: string;

    @IsString()
    @IsNotEmpty({ message: 'Endereço é obrigatório.' })
    endereco: string;

    @IsEnum(TipoUsuario, { message: `Tipo de usuário inválido. Valores permitidos: ${Object.values(TipoUsuario).join(', ')}` })
    tipoUsuario: TipoUsuario;
}
