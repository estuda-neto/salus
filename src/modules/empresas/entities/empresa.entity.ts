import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({ tableName: 'tb_empresas', timestamps: true })
export class Empresa extends Model<InferAttributes<Empresa>, InferCreationAttributes<Empresa>> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    empresaId: CreationOptional<number>;
}
