import { Injectable } from '@nestjs/common';
import { CreateQuadroDto } from './dto/create-quadro.dto';
import { BaseService } from 'src/base/base.service';
import { Quadro } from './entities/quadro.entity';
import { QuadroRepository } from './repositories/preferencias.repository';

@Injectable()
export class QuadrosService  extends BaseService<Quadro, CreateQuadroDto> {
 constructor(private readonly quadroRepository: QuadroRepository) {
     super(quadroRepository);
   }
}
