import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from '../usuarios.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from '../utils/guards/jwt.guard';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { TipoUsuario } from '../utils/enums/tipousuario';
import { LoginUsuarioDto } from '../dto/loginusuario.dto';

// Importe os serviços que o controller usa
import { UsuariosService } from '../usuarios.service';
import { AuthService } from '../auth.service';
import { ResetPasswordDto } from '../dto/reset_password.dto';

describe('UsuariosController', () => {
  let controller: UsuariosController;
  let usuariosService: UsuariosService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      controllers: [UsuariosController],
      providers: [
        {
          provide: UsuariosService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            redefinirSenha: jest.fn(),
            remove: jest.fn(),
            getUsersOfType: jest.fn(),
            obterIdsProfissionaisPorEmpresa: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
        // Mock JwtAuthGuard para liberar o acesso durante os testes
        {
          provide: JwtAuthGuard,
          useValue: {
            canActivate: jest.fn(() => true),
          },
        },
      ],
    }).compile();

    controller = module.get<UsuariosController>(UsuariosController);
    usuariosService = module.get<UsuariosService>(UsuariosService);
    authService = module.get<AuthService>(AuthService);
  });

  it('should create a user', async () => {
    const dto: CreateUsuarioDto = { nome: 'John', email: 'john@mail.com', password: '123', cpf: '', telefone: '', endereco: '', tipoUsuario: TipoUsuario.PACIENTE };

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

    expect(authService.login).toHaveBeenCalledWith(
      dto.email,
      dto.password,
      dto.clientType,
    );
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

  it('should get all users of a given type', async () => {
    const tipo = 'admin';
    const users = [
      { id: 1, nome: 'Admin User', tipoUsuario: tipo },
      { id: 2, nome: 'Another Admin', tipoUsuario: tipo },
    ];

    jest.spyOn(usuariosService, 'getUsersOfType').mockResolvedValue(users as any);

    const result = await controller.getAllUsers(tipo);

    expect(result).toEqual(users);
    expect(usuariosService.getUsersOfType).toHaveBeenCalledWith(tipo);
  });

  it('should return professional IDs by company ID', async () => {
    const empresaId = 123;
    const profIdsMock = [10, 20, 30];

    jest.spyOn(usuariosService, 'obterIdsProfissionaisPorEmpresa').mockResolvedValue(profIdsMock);

    const result = await controller.listarIdsProfissionaisPorEmpresa(empresaId);

    expect(usuariosService.obterIdsProfissionaisPorEmpresa).toHaveBeenCalledWith(empresaId);
    expect(result).toEqual(profIdsMock);
  });

});
