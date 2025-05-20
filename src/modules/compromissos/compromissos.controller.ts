import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompromissosService } from './compromissos.service';
import { CreateCompromissoDto } from './dto/create-compromisso.dto';
import { UpdateCompromissoDto } from './dto/update-compromisso.dto';
import { Compromisso } from './entities/compromisso.entity';

@Controller('compromissos')
export class CompromissosController {
  constructor(private readonly compromissosService: CompromissosService) { }

  @Post()
  async create(@Body() createCompromissoDto: CreateCompromissoDto): Promise<Compromisso> {
    return this.compromissosService.create(createCompromissoDto);
  }

  @Get()
  async findAll(): Promise<Compromisso[]> {
    return this.compromissosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Compromisso | null> {
    return this.compromissosService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCompromissoDto: UpdateCompromissoDto): Promise<[number, Compromisso[]]> {
    return this.compromissosService.update(+id, updateCompromissoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<number> {
    return this.compromissosService.remove(+id);
  }
}
