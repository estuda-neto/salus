import { Injectable } from '@nestjs/common';
import { CreateCompromissoDto } from './dto/create-compromisso.dto';
import { UpdateCompromissoDto } from './dto/update-compromisso.dto';

@Injectable()
export class CompromissosService {
  create(createCompromissoDto: CreateCompromissoDto) {
    return 'This action adds a new compromisso';
  }

  findAll() {
    return `This action returns all compromissos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} compromisso`;
  }

  update(id: number, updateCompromissoDto: UpdateCompromissoDto) {
    return `This action updates a #${id} compromisso`;
  }

  remove(id: number) {
    return `This action removes a #${id} compromisso`;
  }
}
