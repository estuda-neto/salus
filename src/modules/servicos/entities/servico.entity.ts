import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({ tableName: 'tb_servicos', timestamps: true })
export class Servico extends Model<InferAttributes<Servico>, InferCreationAttributes<Servico>> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    servicoId: CreationOptional<number>;
}
