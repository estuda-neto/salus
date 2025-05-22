import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UsuariosController } from '../usuarios.controller';
import { UsuariosService } from '../usuarios.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { ResetPasswordDto } from '../dto/reset_password.dto';
import { LoginUsuarioDto } from '../dto/loginusuario.dto';
import { TipoUsuario } from '../utils/enums/tipousuario';

describe('UsuariosController', () => {
    let controller: UsuariosController;
    let usuariosService: UsuariosService;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsuariosController],
            providers: [
                {
                    provide: UsuariosService,
                    useValue: {
                        create: jest.fn(),
                        sendEmailWithHashResetPassword: jest.fn(),
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        remove: jest.fn(),
                        listarPaginado: jest.fn(),
                        redefinirSenha: jest.fn(),
                    },
                },
                {
                    provide: AuthService,
                    useValue: {
                        login: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<UsuariosController>(UsuariosController);
        usuariosService = module.get<UsuariosService>(UsuariosService);
        authService = module.get<AuthService>(AuthService);
    });

    it('should create a user', async () => {
        const dto: CreateUsuarioDto = {
            nome: 'John',
            email: 'john@mail.com',
            password: '123',
            cpf: '',
            telefone: '',
            endereco: '',
            tipoUsuario: TipoUsuario.PACIENTE,
        };

        const usuario = { id: 1, ...dto };

        jest.spyOn(usuariosService, 'create').mockResolvedValue(usuario as any);

        const result = await controller.create(dto);

        expect(result).toEqual(usuario);
        expect(usuariosService.create).toHaveBeenCalledWith(dto);
    });

    it('should login user', async () => {
        const dto: LoginUsuarioDto = {
            email: 'john@mail.com',
            password: '123',
            clientType: 'web',
        };

        const response = {
            accessToken: 'token',
            user: {
                id: 1,
                nome: 'John',
                email: dto.email,
                cpf: '',
                telefone: '',
                endereco: '',
                tipoUsuario: TipoUsuario.PACIENTE,
            },
        };

        jest.spyOn(authService, 'login').mockResolvedValue(response as any);

        const result = await controller.login(dto);

        expect(result).toMatchObject({
            accessToken: 'token',
            user: {
                id: 1,
                email: dto.email,
            },
        });
        // Aqui corrigido para os argumentos separados:
        expect(authService.login).toHaveBeenCalledWith(dto.email, dto.password, dto.clientType);
    });

    it('should return all users', async () => {
        const users = [{ id: 1, nome: 'John' }];

        jest.spyOn(usuariosService, 'findAll').mockResolvedValue(users as any);

        const result = await controller.findAll();

        expect(result).toEqual(users);
        expect(usuariosService.findAll).toHaveBeenCalled();
    });

    it('should redefine password and return usuarioId', async () => {
        const dto: ResetPasswordDto = {
            token: 'token123',
            email: 'john@mail.com',
            password: '123',
            repassword: '123',
        };

        jest.spyOn(usuariosService, 'redefinirSenha').mockResolvedValue(1);

        const result = await controller.redefinePassword(dto);

        expect(result).toEqual({ usuarioId: 1 });
        // Corrigido para argumentos separados:
        expect(usuariosService.redefinirSenha).toHaveBeenCalledWith(
            dto.token,
            dto.email,
            dto.password,
            dto.repassword,
        );
    });

    it('should delete user and return user id', async () => {
        jest.spyOn(usuariosService, 'remove').mockResolvedValue(1);

        const result = await controller.remove(1);

        expect(result).toBe(1);
        expect(usuariosService.remove).toHaveBeenCalledWith(1);
    });
});
