import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put, ParseIntPipe } from '@nestjs/common';
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
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiError } from 'src/base/base.error';
import { ResetPasswordDto } from './dto/reset_password.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService, private readonly authService: AuthService) { }

  // addBearerAuth swagger docs
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  async findAll(): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return await this.usuariosService.create(createUsuarioDto);
  }

  @Post('login')
  async login(@Body() loginUsuarioDto: LoginUsuarioDto): Promise<LoginResponse> {
    const { email, password, clientType } = loginUsuarioDto;
    if (!['web', 'mobile'].includes(clientType)) throw new Error('client type inválido');
    return await this.authService.login(email, password, clientType);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Usuario | null> {
    return this.usuariosService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUsuarioDto: UpdateUsuarioDto): Promise<[number, Usuario[]]> {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.usuariosService.remove(id);
  }

  @Post('send-email-reset-password')
  async sendEmailPassword(@Body() emailDto: EmailResetDto): Promise<boolean> {
    return await this.usuariosService.sendEmailWithHashResetPassword(emailDto.email);
  }

  @Put('reset-password')
  async redefinePassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<{ usuarioId: number }> {
    const { token, email, password, repassword } = resetPasswordDto;
    const redefinido = await this.usuariosService.redefinirSenha(token, email, password, repassword);
    return { usuarioId: redefinido };
  }

  @Get('get-all/paginate')
  async getPaginate(@Query('limit') limit: string = '10', @Query('offset') offset: string = '0'): Promise<{ rows: Usuario[]; count: number }> {
    const limitNumber = Number(limit);
    const offsetNumber = Number(offset);
    if (isNaN(limitNumber) || isNaN(offsetNumber)) throw new ApiError('Invalid query parameters, not numbers.', 400);
    return await this.usuariosService.listarPaginado(limitNumber, offsetNumber);
  }

  @Get('get-all/typeof')
  async getAllUsers(@Query('tipouser') tipouser: string): Promise<Usuario[]> {
    return await this.usuariosService.getUsersOfType(tipouser);
  }

  @Get('empresa/:empresaId/profissionais-ids')
  async listarIdsProfissionaisPorEmpresa(@Param('empresaId', ParseIntPipe) empresaId: number): Promise<number[]> {
    return this.usuariosService.obterIdsProfissionaisPorEmpresa(empresaId);
  }

}
