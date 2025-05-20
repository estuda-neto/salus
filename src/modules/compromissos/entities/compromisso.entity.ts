import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

@Table({ tableName: 'tb_compromissos', timestamps: true })
export class Compromisso extends Model<InferAttributes<Compromisso>, InferCreationAttributes<Compromisso>> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  compromissoId: CreationOptional<number>;

  @Column(DataType.STRING)
  descricao: string;

  // Outros campos...
}
