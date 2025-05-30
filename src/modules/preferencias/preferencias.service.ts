import { Injectable } from '@nestjs/common';
import { CreatePreferenciaDto } from './dto/create-preferencia.dto';
import { Preferencia } from './entities/preferencia.entity';
import { BaseService } from 'src/base/base.service';
import { PreferenciaRepository } from './repositories/preferencias.repository';

@Injectable()
export class PreferenciasService extends BaseService<Preferencia, CreatePreferenciaDto> {
  constructor(private readonly preferenciaRepository: PreferenciaRepository) {
    super(preferenciaRepository);
  }

  async findAllPreferenciasOfUsuarioId(usuarioId: number): Promise<Preferencia[]> {
    return this.preferenciaRepository.findAllPreferenciasOfUsuarioId(usuarioId);
  }

  async findByIdsAndDateRange(ids: number[], startDate: Date, endDate: Date): Promise<Preferencia[]> {
    return this.preferenciaRepository.findByUsuarioIdsAndDateRange(ids, startDate, endDate);
  }

}
