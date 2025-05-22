
import { Usuario } from '../entities/usuario.entity';
import { TipoUsuario } from '../utils/enums/tipousuario';

describe('Usuario - Entity', () => {
    const mockUsuario: Partial<Usuario> = {
        usuarioId: 1, nome: 'João', cpf: '12345678900', email: 'joao@email.com', password: 'senha123',
        telefone: '11999999999', endereco: 'Rua Teste', tipoUsuario: TipoUsuario.PACIENTE,
    };
    
    it('must contain all expected attributes', () => {
        const atributosEsperados = ['usuarioId', 'nome', 'cpf', 'email', 'password', 'telefone', 'endereco', 'tipoUsuario'];

        for (const atributo of atributosEsperados) {
            expect(mockUsuario).toHaveProperty(atributo);
        }
    });

    it('must have the correct types assigned', () => {
        expect(typeof mockUsuario.usuarioId).toBe('number');
        expect(typeof mockUsuario.nome).toBe('string');
        expect(typeof mockUsuario.cpf).toBe('string');
        expect(typeof mockUsuario.email).toBe('string');
        expect(typeof mockUsuario.password).toBe('string');
        expect(typeof mockUsuario.telefone).toBe('string');
        expect(typeof mockUsuario.endereco).toBe('string');
        expect(Object.values(TipoUsuario)).toContain(mockUsuario.tipoUsuario);
    });
});
