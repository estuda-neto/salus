import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DisponibilidadesService } from './disponibilidades.service';
import { CreateDisponibilidadeDto } from './dto/create-disponibilidade.dto';
import { UpdateDisponibilidadeDto } from './dto/update-disponibilidade.dto';
import { Disponibilidade } from './entities/disponibilidade.entity';

@Controller('disponibilidades')
export class DisponibilidadesController {
  constructor(private readonly disponibilidadesService: DisponibilidadesService) { }

  @Post()
  async create(@Body() createDisponibilidadeDto: CreateDisponibilidadeDto): Promise<Disponibilidade> {
    return this.disponibilidadesService.create(createDisponibilidadeDto);
  }

  @Get()
  async findAll(): Promise<Disponibilidade[]> {
    return this.disponibilidadesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Disponibilidade | null> {
    return this.disponibilidadesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDisponibilidadeDto: UpdateDisponibilidadeDto): Promise<[number, Disponibilidade[]]> {
    return this.disponibilidadesService.update(+id, updateDisponibilidadeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<number> {
    return this.disponibilidadesService.remove(+id);
  }
}
