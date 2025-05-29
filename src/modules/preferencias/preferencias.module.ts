import { Module } from '@nestjs/common';
import { PreferenciasService } from './preferencias.service';
import { PreferenciasController } from './preferencias.controller';
import { Preferencia } from './entities/preferencia.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { PreferenciaRepository } from './repositories/preferencias.repository';

@Module({
  imports:[SequelizeModule.forFeature([Preferencia])],
  controllers: [PreferenciasController],
  providers: [PreferenciasService,PreferenciaRepository],
  exports:[PreferenciasService]
})
export class PreferenciasModule {}
