import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AgendamentosService } from './agendamentos.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { Agendamento } from './entities/agendamento.entity';

@Controller('agendamentos')
export class AgendamentosController {
  constructor(private readonly agendamentosService: AgendamentosService) { }

  @Post()
  async create(@Body() createagendamentoDto: CreateAgendamentoDto): Promise<Agendamento> {
    return this.agendamentosService.create(createagendamentoDto);
  }

  @Get()
  async findAll(): Promise<Agendamento[]> {
    return this.agendamentosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Agendamento | null> {
    return this.agendamentosService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateagendamentoDto: UpdateAgendamentoDto): Promise<[number, Agendamento[]]> {
    return this.agendamentosService.update(id, updateagendamentoDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.agendamentosService.remove(id);
  }
}
