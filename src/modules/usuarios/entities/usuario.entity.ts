import {Table,Column,Model,DataType,PrimaryKey,AutoIncrement,BeforeCreate,} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { TipoUsuario } from '../utils/enums/tipousuario';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

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

  @BeforeCreate
  static async hashPassword(instance: Usuario) {
    const salt = await bcrypt.genSalt(12);
    instance.password = await bcrypt.hash(instance.password, salt);
  }
}