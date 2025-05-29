import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { QuadrosService } from './quadros.service';
import { CreateQuadroDto } from './dto/create-quadro.dto';
import { UpdateQuadroDto } from './dto/update-quadro.dto';
import { Quadro } from './entities/quadro.entity';

@Controller('quadros')
export class QuadrosController {
  constructor(private readonly quadrosService: QuadrosService) {}
  @Get()
      async findAll(): Promise<Quadro[]> {
        return this.quadrosService.findAll();
      }
    
      @Post()
      async create(@Body() createQuadroDto: CreateQuadroDto): Promise<Quadro> {
        return await this.quadrosService.create(createQuadroDto);
      }
    
      @Get(':id')
      async findOne(@Param('id', ParseIntPipe) id: number): Promise<Quadro | null> {
        return this.quadrosService.findOne(id);
      }
    
      @Patch(':id')
      async update(@Param('id', ParseIntPipe) id: number, @Body() updateQuadroDto: UpdateQuadroDto): Promise<[number, Quadro[]]> {
        return this.quadrosService.update(id, updateQuadroDto);
      }
    
      @Delete(':id')
      async remove(@Param('id', ParseIntPipe) id: number): Promise<number> {
        return this.quadrosService.remove(id);
      }
}
