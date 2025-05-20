import { PartialType } from '@nestjs/swagger';
import { CreateCompromissoDto } from './create-compromisso.dto';

export class UpdateCompromissoDto extends PartialType(CreateCompromissoDto) {}
