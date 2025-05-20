import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Compromisso } from './entities/compromisso.entity';
import { CompromissosRepository } from './repository/compromissosRepository';
import { CreateCompromissoDto } from './dto/create-compromisso.dto';

@Injectable()
export class CompromissosService extends BaseService<Compromisso, CreateCompromissoDto> {
  constructor(private readonly compromissosRepository: CompromissosRepository) {
    super(compromissosRepository);
  }
}