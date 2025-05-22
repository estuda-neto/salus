// auth.service.spec.ts

import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { UsuarioRepository } from '../repositories/usuarios.repository';
import { ApiError } from 'src/base/base.error';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { TipoUsuario } from '../utils/enums/tipousuario';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
    let authService: AuthService;
    let configService: ConfigService;
    let usuarioRepository: UsuarioRepository;

    const mockUsuario = {usuarioId: 1,tipoUsuario: TipoUsuario.ADMIN,email: 'test@test.com',password: 'hashed-password'};

    beforeEach(() => {
        configService = {
            get: jest.fn((key: string) => {
                if (key === 'JWT_SECRET') return 'jwt-secret';
                if (key === 'JWT_REFRESH_SECRET') return 'refresh-secret';
                return '';
            }),
        } as any;

        usuarioRepository = {
            buscarPorEmail: jest.fn(),
        } as any;

        authService = new AuthService(configService, usuarioRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('must authenticate successfully', async () => {
        (usuarioRepository.buscarPorEmail as jest.Mock).mockResolvedValue(mockUsuario);
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        (jwt.sign as jest.Mock).mockImplementation((payload, secret, options) => {return `${payload.usuarioId}-${secret}-${options.expiresIn}`;});

        const result = await authService.login('test@test.com', 'password', 'web');

        expect(result).toHaveProperty('accessToken');
        expect(result).toHaveProperty('refreshToken');
        expect(result.accessToken).toContain('jwt-secret');
        expect(result.refreshToken).toContain('refresh-secret');
    });

    it('should throw error if user not found', async () => {
        (usuarioRepository.buscarPorEmail as jest.Mock).mockResolvedValue(null);

        await expect(authService.login('notfound@test.com', 'password', 'web')).rejects.toThrow(ApiError);
        await expect(authService.login('notfound@test.com', 'password', 'web')).rejects.toThrow('User not found');
    });

    it('should throw error if password is incorrect', async () => {
        (usuarioRepository.buscarPorEmail as jest.Mock).mockResolvedValue(mockUsuario);
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        await expect(authService.login('test@test.com', 'wrongpassword', 'web')).rejects.toThrow(ApiError);
        await expect(authService.login('test@test.com', 'wrongpassword', 'web')).rejects.toThrow('Incorrect password');
    });

    it('must generate token with correct validity for web', () => {
        const token = authService.generateToken('123', TipoUsuario.ADMIN, 'web');
        expect(jwt.sign).toHaveBeenCalledWith(
            { usuarioId: '123', tipoUsuario: TipoUsuario.ADMIN, clientType: 'web' },
            'jwt-secret',
            { expiresIn: '30m' }
        );
    });

    it('must generate token with correct validity for mobile', () => {
        const token = authService.generateToken('123', TipoUsuario.ADMIN, 'mobile');
        expect(jwt.sign).toHaveBeenCalledWith({ usuarioId: '123', tipoUsuario: TipoUsuario.ADMIN, clientType: 'mobile' },'jwt-secret',{ expiresIn: '7d' });
    });

    it('must generate refresh token correctly', () => {
        authService.generateRefreshToken('123');
        expect(jwt.sign).toHaveBeenCalledWith({ usuarioId: '123' },'refresh-secret',{ expiresIn: '30d' });
    });
});
