import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasOne } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { CompromissoStatus } from '../enums/status';
import { Servico } from 'src/modules/servicos/entities/servico.entity';

@Table({ tableName: 'tb_compromissos', timestamps: true })
export class Compromisso extends Model<InferAttributes<Compromisso>, InferCreationAttributes<Compromisso>> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  compromissoId: CreationOptional<number>;

  @Column(DataType.STRING)
  descricao: string;

  @Column(DataType.ENUM(...Object.values(CompromissoStatus)))
  compromissoStatus: CompromissoStatus;

  //relationships servico <-> n x n com compromisso <-> 
  @HasOne(() => Servico)
  servico: Servico;
}
