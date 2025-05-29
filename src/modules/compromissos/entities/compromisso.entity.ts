import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { CompromissoStatus } from '../enums/status';
import { Servico } from 'src/modules/servicos/entities/servico.entity';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
import { Agendamento } from 'src/modules/agendamentos/entities/agendamento.entity';

@Table({ tableName: 'tb_compromissos', timestamps: true })
export class Compromisso extends Model<InferAttributes<Compromisso>, InferCreationAttributes<Compromisso>> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare compromissoId: CreationOptional<number>;

  @Column(DataType.STRING)
  declare descricao: string;

  @Column(DataType.ENUM(...Object.values(CompromissoStatus)))
  declare compromissoStatus: CompromissoStatus;

  //relationships servico <-> 1 x n com compromisso <->
  @ForeignKey(() => Servico)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare servicoId: number;

  @BelongsTo(() => Servico)
  declare servico: Servico;

  //relationships agendamento <-> 1 x 1 com compromisso <->
  @ForeignKey(() => Agendamento)
  @Column
  declare agendamentoId: number;

  @BelongsTo(() => Agendamento)
  declare agendamento: Agendamento;

  //relationships usuario <-> 1 x n compromisso <->
  @ForeignKey(() => Usuario)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare usuarioId: number;

  @BelongsTo(() => Usuario)
  declare usuario: Usuario;
}
