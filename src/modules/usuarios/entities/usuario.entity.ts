import {Table,Column,Model,DataType,PrimaryKey,AutoIncrement,BeforeCreate,} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

export enum TipoUsuario {
    ADMIN = "admin",
    CLIENTE = "cliente",
    FUNCIONARIO = "fornecedor",
}

export function fromString(value: string): TipoUsuario {
    switch(value) {
        case 'cliente':
            return TipoUsuario.CLIENTE;
        case 'admin':
            return TipoUsuario.ADMIN;
        default:
            throw new Error("Tipo de usuário inválido.");
    }
}

@Table({ tableName: 'tb_usuarios', timestamps: true })
export class Usuario extends Model<Usuario> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  usuarioId: number;

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