import {Table,Column,Model,DataType,PrimaryKey,AutoIncrement,HasMany,BelongsToMany} from 'sequelize-typescript';
import {CreationOptional,InferAttributes,InferCreationAttributes} from 'sequelize';
import { EmpresaStatus } from '../utils/enums/status';
import { EstadosBrasileiros } from '../utils/enums/estadosbrasileiros';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
import { Servico } from 'src/modules/servicos/entities/servico.entity';
import { EmpresaServico } from 'src/modules/servicos/entities/empresa_servico.entity';

@Table({ tableName: 'tb_empresas', timestamps: true })
export class Empresa extends Model<InferAttributes<Empresa>,InferCreationAttributes<Empresa>> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare empresaId: CreationOptional<number>;

  @Column({ type: DataType.STRING, allowNull: false })
  declare nome: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare cnpj: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare telefone: string;

  @Column({ type: DataType.JSON, allowNull: true })
  declare imagens: string[];

  @Column({ type: DataType.STRING, allowNull: false })
  declare cep: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare rua: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare numero: number;

  @Column({ type: DataType.STRING, allowNull: true })
  declare complemento: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare bairro: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare cidade: string;

  @Column(DataType.ENUM(...Object.values(EstadosBrasileiros)))
  declare estado: EstadosBrasileiros;

  @Column(DataType.ENUM(...Object.values(EmpresaStatus)))
  declare empresaStatus: EmpresaStatus;

  //relationships empresa <-> 1 x n com usuarios <->
  @HasMany(() => Usuario)
  declare usuarios: Usuario[];

  //relationships empresa <-> n x n com serviços <->
  @BelongsToMany(() => Servico, () => EmpresaServico)
  declare servicos: Servico[];
}
