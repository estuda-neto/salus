// empresa-servico.entity.ts
import { Table, Column, Model, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';
import { Empresa } from 'src/modules/empresas/entities/empresa.entity';
import { Servico } from './servico.entity';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

@Table({ tableName: 'tb_empresas_servicos', timestamps: false })
export class EmpresaServico extends Model<InferAttributes<EmpresaServico>, InferCreationAttributes<EmpresaServico>> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    empresaservicoId: CreationOptional<number>;

    @ForeignKey(() => Empresa)
    @Column
    empresaId: number;

    @ForeignKey(() => Servico)
    @Column
    servicoId: number;

    @BelongsTo(() => Empresa)
    empresa: Empresa;

    @BelongsTo(() => Servico)
    servico: Servico;
}
