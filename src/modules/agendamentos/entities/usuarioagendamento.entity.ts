import {Table,Column,Model,ForeignKey,BelongsTo,PrimaryKey,AutoIncrement,DataType} from 'sequelize-typescript';
import {CreationOptional,InferAttributes,InferCreationAttributes} from 'sequelize';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
import { Agendamento } from './agendamento.entity';

@Table({ tableName: 'tb_usuarios_agendamentos', timestamps: false })
export class UsuarioAgendamento extends Model<InferAttributes<UsuarioAgendamento>,InferCreationAttributes<UsuarioAgendamento>> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare usuarioagendamentoId: CreationOptional<number>;

  @ForeignKey(() => Usuario)
  @Column
  declare usuarioId: number;

  @BelongsTo(() => Usuario)
  declare usuario: Usuario;

  @ForeignKey(() => Agendamento)
  @Column
  declare agendamentoId: number;

  @BelongsTo(() => Agendamento)
  declare agendamento: Agendamento;
}
