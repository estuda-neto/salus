import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { DisponibilidadeStatus } from '../enums/status';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
import { Compromisso } from 'src/modules/compromissos/entities/compromisso.entity';

@Table({ tableName: 'tb_disponibilidades', timestamps: true })
export class Disponibilidade extends Model<
  InferAttributes<Disponibilidade>,
  InferCreationAttributes<Disponibilidade>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare disponibilidadeId: CreationOptional<number>;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  declare data: string;

  @Column({ type: DataType.TIME, allowNull: false })
  declare hora: string;

  @Column({
    type: DataType.ENUM(...Object.values(DisponibilidadeStatus)),
    allowNull: false,
  })
  declare status: DisponibilidadeStatus;

  //relationships usuario <-> 1 x n com disponibilidade(agendamento) <->
  @ForeignKey(() => Usuario)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare usuarioId: number;

  @BelongsTo(() => Usuario)
  declare usuario: Usuario;

  //relationships disponibilidade <-> 1 x 1 com compromisso <->
  @HasOne(() => Compromisso)
  declare compromissso: Compromisso;
}
