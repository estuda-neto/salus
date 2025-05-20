import { Injectable } from '@nestjs/common';
import { Disponibilidade } from './entities/disponibilidade.entity';
import { BaseService } from 'src/base/base.service';
import { DisponibilidadesRepository } from './repository/disponibilidadesRepository';
import { CreateDisponibilidadeDto } from './dto/create-disponibilidade.dto';

@Injectable()
export class DisponibilidadesService extends BaseService<Disponibilidade, CreateDisponibilidadeDto> {
  constructor(private readonly disponibilidadeRepository: DisponibilidadesRepository) {
    super(disponibilidadeRepository);
  }
}