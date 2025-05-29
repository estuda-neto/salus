import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasOne, BelongsToMany } from 'sequelize-typescript';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { AgendamentoStatus } from '../enums/status';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
import { Servico } from 'src/modules/servicos/entities/servico.entity';
import { Quadro } from 'src/modules/quadros/entities/quadro.entity';
import { UsuarioAgendamento } from './usuarioagendamento.entity';

@Table({ tableName: 'tb_agendamentos', timestamps: true })
export class Agendamento extends Model<InferAttributes<Agendamento>, InferCreationAttributes<Agendamento>> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare agendamentoId: CreationOptional<number>;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  declare data: string;

  @Column({ type: DataType.TIME, allowNull: false })
  declare horaInicio: string;

  @Column({ type: DataType.TIME, allowNull: false })
  declare horaFim: string;

  @Column({ type: DataType.ENUM(...Object.values(AgendamentoStatus)), allowNull: false })
  declare status: AgendamentoStatus;


  //relationships usuario <-> n x n com Agendamento <->
  @BelongsToMany(() => Usuario, () => UsuarioAgendamento)
  usuarios: Usuario[];

  //relationships servico <-> 1 x n com agendamentos <->
  @ForeignKey(() => Servico)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare servicoId: number;

  @BelongsTo(() => Servico)
  declare servico: Servico;

  //relationships quadro <-> 1 x n com agendamentos <->
  @ForeignKey(() => Quadro)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare quadroId: number;

  @BelongsTo(() => Quadro)
  declare quadro: Quadro;

}
