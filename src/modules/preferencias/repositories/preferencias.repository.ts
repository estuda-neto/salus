import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/base/base.repository';
import { Preferencia } from '../entities/preferencia.entity';
import { Op } from 'sequelize';

@Injectable()
export class PreferenciaRepository extends BaseRepository<Preferencia> {
  constructor(@InjectModel(Preferencia) private readonly preferenciaModel: typeof Preferencia) {
    super(preferenciaModel);
  }

  async findAllPreferenciasOfUsuarioId(usuarioId: number): Promise<Preferencia[]> {
    return this.preferenciaModel.findAll({ where: { usuarioId } });
  }

  async findByUsuarioIdsAndDateRange(usuarioIds: number[], startDate: Date, endDate: Date): Promise<Preferencia[]> {
    return this.preferenciaModel.findAll({
      where: {
        usuarioId: {
          [Op.in]: usuarioIds,
        },
        [Op.or]: [
          {
            createdAt: {
              [Op.between]: [startDate, endDate],
            },
          },
          {
            updatedAt: {
              [Op.between]: [startDate, endDate],
            },
          },
        ],
      },
    });
  }
  
}
