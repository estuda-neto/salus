import { PartialType } from '@nestjs/swagger';
import { CreateQuadroDto } from './create-quadro.dto';

export class UpdateQuadroDto extends PartialType(CreateQuadroDto) {}
