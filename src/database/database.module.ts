import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Agendamento } from 'src/modules/agendamentos/entities/agendamento.entity';
import { Compromisso } from 'src/modules/compromissos/entities/compromisso.entity';
import { Empresa } from 'src/modules/empresas/entities/empresa.entity';
import { EmpresaServico } from 'src/modules/servicos/entities/empresa_servico.entity';
import { Servico } from 'src/modules/servicos/entities/servico.entity';
import { ServicoUsuario } from 'src/modules/servicos/entities/servico_usuario.entity';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test_db',
      models: [Usuario,Empresa,Servico,EmpresaServico,ServicoUsuario,Agendamento,Compromisso],
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
