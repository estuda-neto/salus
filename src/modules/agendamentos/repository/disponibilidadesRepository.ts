import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/base/base.repository';
import { Agendamento } from '../entities/agendamento.entity';

@Injectable()
export class AgendamentosRepository extends BaseRepository<Agendamento> {
  constructor(@InjectModel(Agendamento)private readonly agendamentoModel: typeof Agendamento) {
    super(agendamentoModel);
  }

  // Você pode criar métodos adicionais específicos aqui
}
