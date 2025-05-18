import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DisponibilidadesService } from './disponibilidades.service';
import { CreateDisponibilidadeDto } from './dto/create-disponibilidade.dto';
import { UpdateDisponibilidadeDto } from './dto/update-disponibilidade.dto';

@Controller('disponibilidades')
export class DisponibilidadesController {
  constructor(private readonly disponibilidadesService: DisponibilidadesService) {}

  @Post()
  create(@Body() createDisponibilidadeDto: CreateDisponibilidadeDto) {
    return this.disponibilidadesService.create(createDisponibilidadeDto);
  }

  @Get()
  findAll() {
    return this.disponibilidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.disponibilidadesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDisponibilidadeDto: UpdateDisponibilidadeDto) {
    return this.disponibilidadesService.update(+id, updateDisponibilidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disponibilidadesService.remove(+id);
  }
}
