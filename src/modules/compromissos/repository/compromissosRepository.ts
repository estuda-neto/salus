import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/base/base.repository';
import { Compromisso } from 'src/modules/compromissos/entities/compromisso.entity';

@Injectable()
export class CompromissosRepository extends BaseRepository<Compromisso> {
  constructor(
    @InjectModel(Compromisso)
    private readonly compromissoModel: typeof Compromisso,
  ) {
    super(compromissoModel);
  }

  // Você pode criar métodos adicionais específicos aqui
}
