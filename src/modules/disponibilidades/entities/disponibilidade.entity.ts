import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({ tableName: 'tb_disponibilidades', timestamps: true })
export class Disponibilidade extends Model<InferAttributes<Disponibilidade>, InferCreationAttributes<Disponibilidade>> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    disponibilidadeId: CreationOptional<number>;
}
