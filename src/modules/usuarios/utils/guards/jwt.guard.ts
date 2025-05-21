import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { TipoUsuario } from '../enums/tipousuario';


interface JwtPayload { usuarioId: string; tipoUsuario: TipoUsuario; clientType: 'web' | 'mobile'; iat?: number; exp?: number; }

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private configService: ConfigService) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request & { user?: JwtPayload }>();
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Token não informado');
        }

        const token = authHeader.split(' ')[1];
        const JWT_SECRET = this.configService.get<string>('JWT_SECRET') ?? '';

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
            request.user = decoded;  // adiciona o payload do token no request
            return true;
        } catch (error) {
            throw new UnauthorizedException('Token inválido ou expirado');
        }
    }
}

