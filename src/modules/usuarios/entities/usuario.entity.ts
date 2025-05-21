import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { TipoUsuario } from '../utils/enums/tipousuario';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Empresa } from 'src/modules/empresas/entities/empresa.entity';

@Table({ tableName: 'tb_usuarios', timestamps: true })
export class Usuario extends Model<InferAttributes<Usuario>, InferCreationAttributes<Usuario>> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  usuarioId: CreationOptional<number>;

  @Column(DataType.STRING)
  nome: string;

  @Column({ type: DataType.STRING, unique: true })
  cpf: string;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.STRING)
  telefone: string;

  @Column(DataType.STRING)
  endereco: string;

  @Column(DataType.ENUM(...Object.values(TipoUsuario)))
  tipoUsuario: TipoUsuario;

  //relationships empresa <-> 1 x n com usuarios <-> 
  @ForeignKey(() => Empresa)
  @Column({ type: DataType.INTEGER, allowNull: true })
  empresaId: number;

  @BelongsTo(() => Empresa)
  empresa: Empresa;

}