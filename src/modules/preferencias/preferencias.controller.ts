import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { PreferenciasService } from './preferencias.service';
import { CreatePreferenciaDto } from './dto/create-preferencia.dto';
import { UpdatePreferenciaDto } from './dto/update-preferencia.dto';
import { Preferencia } from './entities/preferencia.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../usuarios/utils/decorators/roles.decorator';
import { JwtAuthGuard } from '../usuarios/utils/guards/jwt.guard';
import { RolesGuard } from '../usuarios/utils/guards/roles.guard';

@Controller('preferencias')
export class PreferenciasController {
  constructor(private readonly preferenciasService: PreferenciasService) { }

  // addBearerAuth swagger docs
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  async findAll(): Promise<Preferencia[]> {
    return this.preferenciasService.findAll();
  }

  @Post()
  async create(@Body() createPreferenciaDto: CreatePreferenciaDto): Promise<Preferencia> {
    return await this.preferenciasService.create(createPreferenciaDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Preferencia | null> {
    return this.preferenciasService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updatePreferenciaDto: UpdatePreferenciaDto): Promise<[number, Preferencia[]]> {
    return this.preferenciasService.update(id, updatePreferenciaDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.preferenciasService.remove(id);
  }

  @Get('usuarios/:id')
  async findAllPreferenciasOfUsuarioId(@Param('usuarioId', ParseIntPipe) usuarioId: number): Promise<Preferencia []> {
    return this.preferenciasService.findAllPreferenciasOfUsuarioId(usuarioId);
  }

}
