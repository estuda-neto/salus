import { Module } from '@nestjs/common';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { EmpresasModule } from './modules/empresas/empresas.module';
import { ServicosModule } from './modules/servicos/servicos.module';
import { DatabaseModule } from './database/database.module';
import { CompromissosModule } from './modules/compromissos/compromissos.module';
import { ConfigModule } from '@nestjs/config';
import { AgendamentosModule } from './modules/agendamentos/agendamentos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsuariosModule,
    EmpresasModule,
    ServicosModule,
    CompromissosModule,
    AgendamentosModule,
    AgendamentosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
