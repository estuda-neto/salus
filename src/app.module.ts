import { Module } from '@nestjs/common';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { EmpresasModule } from './modules/empresas/empresas.module';
import { ServicosModule } from './modules/servicos/servicos.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AgendamentosModule } from './modules/agendamentos/agendamentos.module';
import { PreferenciasModule } from './modules/preferencias/preferencias.module';
import { QuadrosModule } from './modules/quadros/quadros.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AgendamentosModule,
    EmpresasModule,
    PreferenciasModule,
    QuadrosModule,
    ServicosModule,
    UsuariosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
