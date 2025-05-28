import {Table,Column,Model,ForeignKey,BelongsTo,PrimaryKey,AutoIncrement,DataType} from 'sequelize-typescript';
import { Empresa } from 'src/modules/empresas/entities/empresa.entity';
import { Servico } from './servico.entity';
import {CreationOptional,InferAttributes,InferCreationAttributes} from 'sequelize';

@Table({ tableName: 'tb_empresas_servicos', timestamps: false })
export class EmpresaServico extends Model<InferAttributes<EmpresaServico>,InferCreationAttributes<EmpresaServico>> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare empresaservicoId: CreationOptional<number>;

  @ForeignKey(() => Empresa)
  @Column
  declare empresaId: number;

  @ForeignKey(() => Servico)
  @Column
  declare servicoId: number;

  @BelongsTo(() => Empresa)
  declare empresa: Empresa;

  @BelongsTo(() => Servico)
  declare servico: Servico;
}
