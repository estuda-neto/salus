import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/base/base.repository';
import { Compromisso } from 'src/modules/compromissos/entities/compromisso.entity';
import { Disponibilidade } from '../entities/disponibilidade.entity';

@Injectable()
export class DisponibilidadesRepository extends BaseRepository<Disponibilidade> {

  constructor(@InjectModel(Disponibilidade) private readonly disponibilidadeModel: typeof Disponibilidade) {
    super(disponibilidadeModel);
  }

  // Você pode criar métodos adicionais específicos aqui
}