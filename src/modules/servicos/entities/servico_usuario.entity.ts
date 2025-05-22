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
    declare servicousuarioId: CreationOptional<number>;

    @ForeignKey(() => Usuario)
    @Column
    declare usuarioId: number;

    @ForeignKey(() => Servico)
    @Column
    declare servicoId: number;

    @BelongsTo(() => Usuario)
    declare usuario: Usuario;

    @BelongsTo(() => Servico)
    declare servico: Servico;
}






ServicoUsuario