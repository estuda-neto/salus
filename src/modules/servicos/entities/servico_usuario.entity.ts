// empresa-servico.entity.ts
import { Table, Column, Model, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';
import { Empresa } from 'src/modules/empresas/entities/empresa.entity';
import { Servico } from './servico.entity';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';

@Table({ tableName: 'tb_servicos_usuarios', timestamps: false })
export class ServicoUsuario extends Model<InferAttributes<ServicoUsuario>, InferCreationAttributes<ServicoUsuario>> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    servicousuarioId: CreationOptional<number>;

    @ForeignKey(() => Usuario)
    @Column
    usuarioId: number;

    @ForeignKey(() => Servico)
    @Column
    servicoId: number;

    @BelongsTo(() => Usuario)
    usuario: Usuario;

    @BelongsTo(() => Servico)
    servico: Servico;
}






ServicoUsuario