import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from './repositories/usuarios.repository';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { ApiError } from 'src/base/base.error';

@Injectable()
export class EmailsService {
  private readonly transporter: Transporter;

  constructor(private readonly configService: ConfigService, private readonly usuariosRepository: UsuarioRepository) {
    this.transporter = nodemailer.createTransport({
      host: this.getEmailhost(),
      port: Number(this.getEmailPort()),
      secure: true,
      auth: {
        user: this.getEmaiUser(),
        pass: this.getEmailPassword(),
      },
    });
  }

  private getEmailhost(): string {
    return this.configService.get<string>('EMAIL_HOST') ?? 'smtp.zoho.com';
  }
  private getEmailPort(): string {
    return this.configService.get<string>('EMAIL_PORT') ?? '587';
  }
  private getEmaiUser(): string {
    return (this.configService.get<string>('EMAIL_USER') ?? 'defaultEmail@gmail.com');
  }
  private getEmailPassword(): string {
    return this.configService.get<string>('EMAIL_PASS') ?? 'defaultpassword';
  }

  public async sendEmail(to: string, subject: string, text: string, html?: string) {
    const from = this.getEmaiUser();
    try {
      const info = await this.transporter.sendMail({ from, to, subject, text, html });
      return info;
    } catch {
      throw new ApiError(`Error sending email`, 500);
    }
  }
}
