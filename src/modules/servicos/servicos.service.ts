import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Servico } from './entities/servico.entity';
import { ServicosRepository } from './repository/servicosRepository';
import { CreateServicoDto } from './dto/create-servico.dto';

@Injectable()
export class ServicosService extends BaseService<Servico, CreateServicoDto> {
  constructor(private readonly servicosRepository: ServicosRepository) {
    super(servicosRepository);
  }
}
