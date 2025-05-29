import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/base/base.repository';
import { Quadro } from '../entities/quadro.entity';

@Injectable()
export class QuadroRepository extends BaseRepository<Quadro> {
  constructor(@InjectModel(Quadro) private readonly quadroModel: typeof Quadro) {
    super(quadroModel);
  }
}
