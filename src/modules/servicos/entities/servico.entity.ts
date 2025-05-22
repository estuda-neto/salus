import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { TipoServico } from '../utils/enums/tiposervico';
import { Empresa } from 'src/modules/empresas/entities/empresa.entity';
import { EmpresaServico } from './empresa_servico.entity';
import { Compromisso } from 'src/modules/compromissos/entities/compromisso.entity';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
import { ServicoUsuario } from './servico_usuario.entity';

@Table({ tableName: 'tb_servicos', timestamps: true })
export class Servico extends Model<
  InferAttributes<Servico>,
  InferCreationAttributes<Servico>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare servicoId: CreationOptional<number>;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    validate: { min: 0 },
  })
  declare valor: number;

  @Column({ type: DataType.INTEGER, allowNull: false, validate: { min: 1 } })
  declare duracao: number; // duração em minutos, % 60 e transformar, depende do procedimento

  @Column(DataType.ENUM(...Object.values(TipoServico)))
  declare tipoServico: TipoServico;

  //relationships empresa <-> n x n com serviços <->
  @BelongsToMany(() => Empresa, () => EmpresaServico)
  declare empresas: Empresa[];

  //relationships servico <-> n x n com compromisso <->
  @ForeignKey(() => Compromisso)
  @Column
  declare compromissoId: number;

  @BelongsTo(() => Compromisso)
  declare compromisso: Compromisso;

  //relationships usuario <-> n x n com serviço <->
  @BelongsToMany(() => Usuario, () => ServicoUsuario)
  declare usuarios: Usuario[];
}
