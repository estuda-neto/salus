import {Table,Column,Model,DataType,PrimaryKey,AutoIncrement,BelongsTo,ForeignKey,HasMany,BelongsToMany} from 'sequelize-typescript';
import { TipoUsuario } from '../utils/enums/tipousuario';
import {CreationOptional,InferAttributes,InferCreationAttributes} from 'sequelize';
import { Empresa } from 'src/modules/empresas/entities/empresa.entity';
import { Servico } from 'src/modules/servicos/entities/servico.entity';
import { ServicoUsuario } from 'src/modules/servicos/entities/servico_usuario.entity';
import { Compromisso } from 'src/modules/compromissos/entities/compromisso.entity';
import { Agendamento } from 'src/modules/agendamentos/entities/agendamento.entity';

@Table({ tableName: 'tb_usuarios', timestamps: true })
export class Usuario extends Model<InferAttributes<Usuario>,InferCreationAttributes<Usuario>> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare usuarioId: CreationOptional<number>;

  @Column(DataType.STRING)
  declare nome: string;

  @Column({ type: DataType.STRING, unique: true })
  declare cpf: string;

  @Column({ type: DataType.STRING, unique: true })
  declare email: string;

  @Column(DataType.STRING)
  declare password: string;

  @Column(DataType.STRING)
  declare telefone: string;

  @Column(DataType.STRING)
  declare endereco: string;

  @Column(DataType.ENUM(...Object.values(TipoUsuario)))
  declare tipoUsuario: TipoUsuario;

  //relationships empresa <-> 1 x n com usuarios <->
  @ForeignKey(() => Empresa)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare empresaId: number;

  @BelongsTo(() => Empresa)
  declare empresa: Empresa;

  //relationships usuario <-> 1 x n com agendamento <->
  @HasMany(() => Agendamento)
  declare agendamentos: Agendamento[];

  //relationships usuario <-> n x n com serviço <->
  @BelongsToMany(() => Servico, () => ServicoUsuario)
  declare servicos: Servico[];

  //relationships usuario <-> 1 x n compromisso <->
  @HasMany(() => Compromisso)
  declare compromissos: Compromisso[];
}
