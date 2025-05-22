import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EmailsService } from '../emails.service';
import { UsuarioRepository } from '../repositories/usuarios.repository';
import { ApiError } from 'src/base/base.error';

jest.mock('nodemailer');

describe('EmailsService', () => {
  let service: EmailsService;
  let configService: ConfigService;
  let usuariosRepository: UsuarioRepository;

  const sendMailMock = jest.fn();

  beforeEach(() => {
    // Mock do nodemailer.createTransport
    (nodemailer.createTransport as jest.Mock).mockReturnValue({ sendMail: sendMailMock });

    configService = {
      get: jest.fn((key: string) => {
        const config = {
          EMAIL_HOST: 'smtp.test.com',
          EMAIL_PORT: '465',
          EMAIL_USER: 'testuser@test.com',
          EMAIL_PASS: 'testpass',
        };
        return config[key];
      }),
    } as any;

    usuariosRepository = {} as UsuarioRepository;
    service = new EmailsService(configService, usuariosRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send an email successfully', async () => {
    const mockResponse = { messageId: 'abc123' };
    sendMailMock.mockResolvedValue(mockResponse);

    const result = await service.sendEmail('destino@test.com', 'Assunto', 'Texto do email');

    expect(sendMailMock).toHaveBeenCalledWith({ from: 'testuser@test.com', to: 'destino@test.com', subject: 'Assunto', text: 'Texto do email', html: undefined });
    expect(result).toEqual(mockResponse);
  });

  it('should throw error when failing to send email', async () => {
    sendMailMock.mockRejectedValue(new Error('Falha'));

    await expect(
      service.sendEmail('destino@test.com', 'Erro', 'Erro')
    ).rejects.toThrow(ApiError);

    await expect(
      service.sendEmail('destino@test.com', 'Erro', 'Erro')
    ).rejects.toThrow('Error sending email');
  });



});