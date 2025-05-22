import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { Empresa } from './entities/empresa.entity';

@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) { }

  @Post()
  async create(@Body() createEmpresaDto: CreateEmpresaDto): Promise<Empresa> {
    return this.empresasService.create(createEmpresaDto);
  }

  @Get()
  async findAll(): Promise<Empresa[]> {
    return this.empresasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Empresa | null> {
    return this.empresasService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateEmpresaDto: UpdateEmpresaDto): Promise<[number, Empresa[]]> {
    return this.empresasService.update(id, updateEmpresaDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.empresasService.remove(id);
  }
}
