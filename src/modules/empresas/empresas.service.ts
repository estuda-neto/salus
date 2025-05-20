import { Injectable } from '@nestjs/common';
import { Empresa } from './entities/empresa.entity';
import { BaseService } from 'src/base/base.service';
import { EmpresasRepository } from './repository/empresasRepository';
import { CreateEmpresaDto } from './dto/create-empresa.dto';

@Injectable()
export class EmpresasService extends BaseService<Empresa, CreateEmpresaDto> {
  constructor(private readonly empresasRepository: EmpresasRepository) {
    super(empresasRepository);
  }
}
