import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany, BelongsToMany } from 'sequelize-typescript';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { EmpresaStatus } from '../utils/enums/status';
import { EstadosBrasileiros } from '../utils/enums/estadosbrasileiros';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
import { Servico } from 'src/modules/servicos/entities/servico.entity';
import { EmpresaServico } from 'src/modules/servicos/entities/empresa_servico.entity';

@Table({ tableName: 'tb_empresas', timestamps: true })
export class Empresa extends Model<InferAttributes<Empresa>, InferCreationAttributes<Empresa>> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    empresaId: CreationOptional<number>;

    @Column({ type: DataType.STRING, allowNull: false })
    nome: string;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    cnpj: string;

    @Column({ type: DataType.STRING, allowNull: false })
    telefone: string;

    @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
    imagens: string[];

    @Column({ type: DataType.STRING, allowNull: false })
    cep: string;

    @Column({ type: DataType.STRING, allowNull: false })
    rua: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    numero: number;

    @Column({ type: DataType.STRING, allowNull: true })
    complemento: string;

    @Column({ type: DataType.STRING, allowNull: false })
    bairro: string;

    @Column({ type: DataType.STRING, allowNull: false })
    cidade: string;

    @Column(DataType.ENUM(...Object.values(EstadosBrasileiros)))
    estado: EstadosBrasileiros;

    @Column(DataType.ENUM(...Object.values(EmpresaStatus)))
    empresaStatus: EmpresaStatus;

    //relationships empresa <-> 1 x n com usuarios <-> 
    @HasMany(() => Usuario)
    usuarios: Usuario[];

    //relationships empresa <-> n x n com serviços <-> 
    @BelongsToMany(() => Servico, () => EmpresaServico)
    servicos: Servico[]
}
