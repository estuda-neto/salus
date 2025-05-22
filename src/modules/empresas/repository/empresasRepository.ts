import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/base/base.repository';
import { Empresa } from '../entities/empresa.entity';

@Injectable()
export class EmpresasRepository extends BaseRepository<Empresa> {
  constructor(
    @InjectModel(Empresa) private readonly empresaModel: typeof Empresa,
  ) {
    super(empresaModel);
  }

  // Você pode criar métodos adicionais específicos aqui
}
