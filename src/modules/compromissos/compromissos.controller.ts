import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompromissosService } from './compromissos.service';
import { CreateCompromissoDto } from './dto/create-compromisso.dto';
import { UpdateCompromissoDto } from './dto/update-compromisso.dto';

@Controller('compromissos')
export class CompromissosController {
  constructor(private readonly compromissosService: CompromissosService) {}

  @Post()
  create(@Body() createCompromissoDto: CreateCompromissoDto) {
    return this.compromissosService.create(createCompromissoDto);
  }

  @Get()
  findAll() {
    return this.compromissosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compromissosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompromissoDto: UpdateCompromissoDto) {
    return this.compromissosService.update(+id, updateCompromissoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compromissosService.remove(+id);
  }
}
