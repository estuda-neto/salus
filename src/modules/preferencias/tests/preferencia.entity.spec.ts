import { Preferencia } from '../entities/preferencia.entity';

describe('Preferencia - Entity', () => {
    const mockPreferencia: Partial<Preferencia> = {
        preferenciaId: 1,
        diaSemana: 1,
        horaInicio: '08:00:00',
        horaFim: '12:00:00',
        createdAt: new Date(),
        updatedAt: new Date(),
        usuarioId: 101,
        quadroId: 202,
    };

    it('must contain all expected attributes', () => {
        const atributosEsperados = ['preferenciaId', 'diaSemana', 'horaInicio', 'horaFim', 'createdAt', 'updatedAt', 'usuarioId', 'quadroId'];

        for (const atributo of atributosEsperados) {
            expect(mockPreferencia).toHaveProperty(atributo);
        }
    });

    it('must have the correct types assigned', () => {
        expect(typeof mockPreferencia.preferenciaId).toBe('number');
        expect(typeof mockPreferencia.diaSemana).toBe('number');
        expect(typeof mockPreferencia.horaInicio).toBe('string');
        expect(typeof mockPreferencia.horaFim).toBe('string');
        expect(mockPreferencia.createdAt).toBeInstanceOf(Date);
        expect(mockPreferencia.updatedAt).toBeInstanceOf(Date);
        expect(typeof mockPreferencia.usuarioId).toBe('number');
        expect(typeof mockPreferencia.quadroId).toBe('number');
    });
});
