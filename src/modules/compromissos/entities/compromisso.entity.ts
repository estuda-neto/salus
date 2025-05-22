import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasOne, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { CompromissoStatus } from '../enums/status';
import { Servico } from 'src/modules/servicos/entities/servico.entity';
import { Disponibilidade } from 'src/modules/disponibilidades/entities/disponibilidade.entity';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';

@Table({ tableName: 'tb_compromissos', timestamps: true })
export class Compromisso extends Model<InferAttributes<Compromisso>, InferCreationAttributes<Compromisso>> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare compromissoId: CreationOptional<number>;

  @Column(DataType.STRING)
  declare descricao: string;

  @Column(DataType.ENUM(...Object.values(CompromissoStatus)))
  declare compromissoStatus: CompromissoStatus;

  //relationships servico <-> n x n com compromisso <-> 
  @HasOne(() => Servico)
  declare servico: Servico;

  //relationships disponibilidade <-> 1 x 1 com compromisso <->
  @ForeignKey(() => Disponibilidade)
  @Column
  declare disponibilidadeId: number;

  @BelongsTo(() => Disponibilidade)
  declare disponibilidade: Disponibilidade;

  //relationships usuario <-> 1 x n compromisso <-> 
  @ForeignKey(() => Usuario)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare usuarioId: number;

  @BelongsTo(() => Usuario)
  declare usuario: Usuario;
}
