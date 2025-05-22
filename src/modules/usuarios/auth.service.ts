import { Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import * as bcrypt from 'bcrypt';
import { TipoUsuario } from './utils/enums/tipousuario';
import { Usuario } from './entities/usuario.entity';
import { UsuarioRepository } from './repositories/usuarios.repository';
import { ConfigService } from '@nestjs/config';
import { LoginResponse } from './utils/interfaces/loginresponse';

@Injectable()
export class AuthService {
    private JWT_SECRET: string;
    private JWT_REFRESH_SECRET: string;

    constructor(private configService: ConfigService, private readonly usuarioRepository: UsuarioRepository) {
        this.JWT_SECRET = this.configService.get<string>('JWT_SECRET') ?? '';
        this.JWT_REFRESH_SECRET = this.configService.get<string>('JWT_REFRESH_SECRET') ?? '';
    }

    public generateToken(usuarioId: string, tipoUsuario: TipoUsuario, clientType: "web" | "mobile") {
        const expiresIn = clientType === "web" ? "30m" : "7d";
        return jwt.sign({ usuarioId, tipoUsuario, clientType }, this.JWT_SECRET, { expiresIn });
    }

    public generateRefreshToken(usuarioId: string) {
        return jwt.sign({ usuarioId }, this.JWT_REFRESH_SECRET, { expiresIn: "30d" });
    }

    public async login(email: string, password: string, clientType: "web" | "mobile"): Promise<LoginResponse> {
        const usuario: Usuario | null = await this.usuarioRepository.buscarPorEmail(email);
        if (!usuario) throw new Error("Usuário não encontrado");

        const passwordMatch = await bcrypt.compare(password, usuario.password);
        if (!passwordMatch) throw new Error("Senha incorreta");

        const accessToken = this.generateToken(usuario.usuarioId.toString(), usuario.tipoUsuario, clientType);
        const refreshToken = this.generateRefreshToken(usuario.usuarioId.toString());

        return { accessToken, refreshToken } as LoginResponse;
    }

}
