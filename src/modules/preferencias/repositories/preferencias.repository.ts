import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/base/base.repository';
import { Preferencia } from '../entities/preferencia.entity';

@Injectable()
export class PreferenciaRepository extends BaseRepository<Preferencia> {
  constructor(@InjectModel(Preferencia) private readonly preferenciaModel: typeof Preferencia) {
    super(preferenciaModel);
  }
  
  async findAllPreferenciasOfUsuarioId(usuarioId: number): Promise<Preferencia[]> {
    return this.preferenciaModel.findAll({ where: { usuarioId } });
  }
}
