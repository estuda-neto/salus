import { Module } from '@nestjs/common';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { EmpresasModule } from './modules/empresas/empresas.module';
import { ServicosModule } from './modules/servicos/servicos.module';
import { DisponibilidadesModule } from './modules/disponibilidades/disponibilidades.module';
import { DatabaseModule } from './database/database.module';
import { CompromissosModule } from './modules/compromissos/compromissos.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, UsuariosModule, EmpresasModule, ServicosModule, CompromissosModule, DisponibilidadesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
