import { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, HasOne, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Quadro } from "src/modules/quadros/entities/quadro.entity";
import { Usuario } from "src/modules/usuarios/entities/usuario.entity";

@Table({ tableName: 'tb_preferencias', timestamps: true })
export class Preferencia extends Model<InferAttributes<Preferencia>, InferCreationAttributes<Preferencia>> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare preferenciaId: CreationOptional<number>;

    @Column(DataType.INTEGER)
    declare diaSemana: number; // 0=Domingo, 1=Segunda, ..., 6=Sábado

    @Column(DataType.TIME)
    declare horaInicio: string; // Ex: '08:00:00'

    @Column(DataType.TIME)
    declare horaFim: string; // Ex: '12:00:00'

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @ForeignKey(() => Usuario)
    @Column({ type: DataType.INTEGER, allowNull: true })
    declare usuarioId: number;

    @BelongsTo(() => Usuario)
    declare usuario: Usuario;

    @ForeignKey(() => Quadro)
    @Column({ type: DataType.INTEGER, allowNull: true })
    declare quadroId: number;

    @BelongsTo(() => Quadro)
    quadro: Quadro;
}

