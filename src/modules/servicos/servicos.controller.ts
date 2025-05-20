import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { Servico } from './entities/servico.entity';

@Controller('servicos')
export class ServicosController {
  constructor(private readonly servicosService: ServicosService) { }

  @Post()
  async create(@Body() createServicoDto: CreateServicoDto): Promise<Servico> {
    return await this.servicosService.create(createServicoDto);
  }

  @Get()
  async findAll(): Promise<Servico[]> {
    return this.servicosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Servico | null> {
    return this.servicosService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateServicoDto: UpdateServicoDto): Promise<[number, Servico[]]> {
    return this.servicosService.update(+id, updateServicoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<number> {
    return this.servicosService.remove(+id);
  }
}
