import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
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
      models: [Usuario],
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
})
export class DatabaseModule { }
