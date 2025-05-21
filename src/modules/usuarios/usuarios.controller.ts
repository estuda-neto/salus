import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { LoginUsuarioDto } from './dto/loginusuario.dto';
import { LoginResponse } from './utils/interfaces/loginresponse';
import { AuthService } from './auth.service';
import { EmailResetDto } from './dto/email_reset.dto';
import { JwtAuthGuard } from './utils/guards/jwt.guard';
import { RolesGuard } from './utils/guards/roles.guard';
import { Roles } from './utils/decorators/roles.decorator';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService, private readonly authService: AuthService) { }

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return await this.usuariosService.create(createUsuarioDto);
  }

  @Post('login')
  async login(@Body() loginUsuarioDto: LoginUsuarioDto): Promise<LoginResponse> {
    const { email, password, clientType } = loginUsuarioDto;
    if (!["web", "mobile"].includes(clientType)) throw new Error("client type inválido");
    return await this.authService.login(email, password, clientType);
  }

  @Post('send-reset-password')
  async sendEmailPassword(@Body() emailDto:EmailResetDto):Promise<boolean>{
    return  await this.usuariosService.sendEmailWithHashResetPassword(emailDto.email);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  async findAll(): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Usuario | null> {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto): Promise<[number, Usuario[]]> {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<number> {
    return this.usuariosService.remove(+id);
  }
}
