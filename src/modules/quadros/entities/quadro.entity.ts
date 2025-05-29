import { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { AutoIncrement, Column, CreatedAt, DataType, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Agendamento } from "src/modules/agendamentos/entities/agendamento.entity";
import { Empresa } from "src/modules/empresas/entities/empresa.entity";
import { Preferencia } from "src/modules/preferencias/entities/preferencia.entity";

@Table({ tableName: 'tb_quadros', timestamps: true })
export class Quadro extends Model<InferAttributes<Quadro>, InferCreationAttributes<Quadro>> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare quadroId: CreationOptional<number>;

    @Column(DataType.DATE)
    declare dataAprovacao: Date;

    @Column({ type: DataType.ENUM('ativo', 'inativo'), defaultValue: 'ativo' })
    declare status: 'ativo' | 'inativo';

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    //relationships quadro <-> 1 x n com preferencia <->
    @HasMany(() => Preferencia)
    preferencias: Preferencia[];


    //relationships quadro <-> 1 x 1 com empresa <->
    @ForeignKey(() => Empresa)
    @Column({ type: DataType.INTEGER, allowNull: true })
    declare empresaId: number;

    @HasOne(() => Empresa)
    empresa: Empresa;

    //relationships quadro <-> 1 x n com agendamentos <->
    @HasMany(() => Agendamento)
    agendamentos: Agendamento[];

}

