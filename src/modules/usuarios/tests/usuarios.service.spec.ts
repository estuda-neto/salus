import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../usuarios.service';
import { UsuarioRepository } from '../repositories/usuarios.repository';
import { EmailsService } from '../emails.service';
import { TokensService } from '../token.service';
import { TipoUsuario } from '../utils/enums/tipousuario';
import { ApiError } from 'src/base/base.error';

describe('UsuariosService', () => {
  let service: UsuariosService;
  let usuariosRepository: jest.Mocked<UsuarioRepository>;
  let emailsService: jest.Mocked<EmailsService>;
  let tokensService: jest.Mocked<TokensService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        {
          provide: UsuarioRepository,
          useValue: {
            create: jest.fn(),
            buscarPorEmail: jest.fn(),
            update: jest.fn(),
            findWithPagination: jest.fn(),
            buscarPorTipo: jest.fn(),
          },
        },
        {
          provide: EmailsService,
          useValue: {
            sendEmail: jest.fn(),
          },
        },
        {
          provide: TokensService,
          useValue: {
            generateToken: jest.fn(),
            validateToken: jest.fn(),
            decryptToken: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
    usuariosRepository = module.get(UsuarioRepository);
    emailsService = module.get(EmailsService);
    tokensService = module.get(TokensService);
  });

  it('should send email with token when user exists', async () => {
    const email = 'user@mail.com';
    usuariosRepository.buscarPorEmail.mockResolvedValue({
      id: 1,
      email,
    } as any);
    tokensService.generateToken.mockResolvedValue('token123');

    const result = await service.sendEmailWithHashResetPassword(email);

    expect(usuariosRepository.buscarPorEmail).toHaveBeenCalledWith(email);
    expect(tokensService.generateToken).toHaveBeenCalledWith(email);
    expect(emailsService.sendEmail).toHaveBeenCalledWith(email, 'Token para redefinição de senha', 'token123', `um html "token123"`);
    expect(result).toBe(true);
  });

  it('should return false when user does not exist', async () => {
    usuariosRepository.buscarPorEmail.mockResolvedValue(null);

    const result =
      await service.sendEmailWithHashResetPassword('notfound@mail.com');

    expect(result).toBe(false);
    expect(emailsService.sendEmail).not.toHaveBeenCalled();
  });

  it('should update password if token valid and passwords match', async () => {
    const token = 'token123';
    const email = 'user@mail.com';
    const password = 'newpass';
    const repassword = 'newpass';

    tokensService.validateToken.mockResolvedValue(true);
    tokensService.decryptToken.mockResolvedValue(email);
    usuariosRepository.buscarPorEmail.mockResolvedValue({ usuarioId: 42, password: 'oldhash' } as any);

    jest.spyOn(bcrypt, 'genSalt').mockImplementation(async () => 'salt');
    jest.spyOn(bcrypt, 'hash').mockImplementation(async () => 'newhash');

    usuariosRepository.update.mockResolvedValue([1, []]); // <-- retorno corrigido

    const result = await service.redefinirSenha(token, email, password, repassword);

    expect(tokensService.validateToken).toHaveBeenCalledWith(token, email);
    expect(tokensService.decryptToken).toHaveBeenCalledWith(token);
    expect(usuariosRepository.buscarPorEmail).toHaveBeenCalledWith(email);
    expect(bcrypt.genSalt).toHaveBeenCalledWith(12);
    expect(bcrypt.hash).toHaveBeenCalledWith(password, 'salt');
    expect(usuariosRepository.update).toHaveBeenCalledWith(42, expect.objectContaining({ password: 'newhash' }));
    expect(result).toBe(1);
  });

  it('should return 0 if token invalid', async () => {
    tokensService.validateToken.mockResolvedValue(false);
    const result = await service.redefinirSenha('token', 'email', 'pass', 'pass');
    expect(result).toBe(0);
  });

  it('should return 0 if password and repassword do not match', async () => {
    tokensService.validateToken.mockResolvedValue(true);
    tokensService.decryptToken.mockResolvedValue('email');
    const result = await service.redefinirSenha('token', 'email', 'pass1', 'pass2');
    expect(result).toBe(0);
  });

  it('should return users array when tipoUsuario is valid', async () => {
    const tipoValido = 'admin';
    const usuariosMock = [{ id: 1, nome: 'Admin1', tipoUsuario: TipoUsuario.ADMIN }, { id: 2, nome: 'Admin2', tipoUsuario: TipoUsuario.ADMIN }];

    (usuariosRepository.buscarPorTipo as jest.Mock).mockResolvedValue(usuariosMock);

    const result = await service.getUsersOfType(tipoValido);

    expect(result).toEqual(usuariosMock);
    expect(usuariosRepository.buscarPorTipo).toHaveBeenCalledWith(TipoUsuario.ADMIN);
  });

  it('should throw ApiError when tipoUsuario is invalid', async () => {
    const tipoInvalido = 'invalido';

    await expect(service.getUsersOfType(tipoInvalido)).rejects.toThrow(ApiError);
    await expect(service.getUsersOfType(tipoInvalido)).rejects.toMatchObject({ message: 'Tipo de usuário inválido.', status: 400 });
    expect(usuariosRepository.buscarPorTipo).not.toHaveBeenCalled();
  });

});
