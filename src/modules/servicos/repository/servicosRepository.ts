import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/base/base.repository';
import { Servico } from '../entities/servico.entity';

@Injectable()
export class ServicosRepository extends BaseRepository<Servico> {

  constructor(@InjectModel(Servico) private readonly servicoModel: typeof Servico) {
    super(servicoModel);
  }

  // Você pode criar métodos adicionais específicos aqui
}