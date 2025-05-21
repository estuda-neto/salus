import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { DisponibilidadeStatus } from '../enums/status';

@Table({ tableName: 'tb_disponibilidades', timestamps: true })
export class Disponibilidade extends Model<InferAttributes<Disponibilidade>, InferCreationAttributes<Disponibilidade>> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    disponibilidadeId: CreationOptional<number>;

    @Column({ type: DataType.DATEONLY, allowNull: false })
    data: string;

    @Column({ type: DataType.TIME, allowNull: false, })
    hora: string;

    @Column({ type: DataType.ENUM(...Object.values(DisponibilidadeStatus)), allowNull: false, })
    status: DisponibilidadeStatus;
}
