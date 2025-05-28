import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { AgendamentosRepository } from './repository/disponibilidadesRepository';
import { Agendamento } from '../agendamentos/entities/agendamento.entity';
import { CreateAgendamentoDto } from '../agendamentos/dto/create-agendamento.dto';

@Injectable()
export class AgendamentosService extends BaseService<Agendamento,CreateAgendamentoDto> {
  constructor(private readonly agendamentosRepository: AgendamentosRepository) {
    super(agendamentosRepository);
  }
}
