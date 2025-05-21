import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasOne } from 'sequelize-typescript';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { DisponibilidadeStatus } from '../enums/status';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
import { Compromisso } from 'src/modules/compromissos/entities/compromisso.entity';

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

    //relationships usuario <-> 1 x n com disponibilidade(agendamento) <-> 
    @ForeignKey(() => Usuario)
    @Column({ type: DataType.INTEGER, allowNull: true })
    usuarioId: number;

    @BelongsTo(() => Usuario)
    usuario: Usuario;

    //relationships disponibilidade <-> 1 x 1 com compromisso <-> 
    @HasOne(() => Compromisso)
    compromissso: Compromisso;

}
