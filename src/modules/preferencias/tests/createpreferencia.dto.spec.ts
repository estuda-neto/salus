import { validate } from 'class-validator';
import { CreatePreferenciaDto } from '../dto/create-preferencia.dto';

describe('CreatePreferenciaDto', () => {
  it('should validate a valid DTO successfully', async () => {
    const dto = new CreatePreferenciaDto();
    dto.diaSemana = 3;
    dto.horaInicio = '08:00:00';
    dto.horaFim = '12:30:00';
    dto.usuarioId = 10;
    dto.quadroId = 5;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should allow optional usuarioId and quadroId to be undefined', async () => {
    const dto = new CreatePreferenciaDto();
    dto.diaSemana = 2;
    dto.horaInicio = '09:00:00';
    dto.horaFim = '18:00:00';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail if diaSemana is out of range', async () => {
    const dto = new CreatePreferenciaDto();
    dto.diaSemana = 7; // inválido
    dto.horaInicio = '08:00:00';
    dto.horaFim = '12:00:00';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('diaSemana');
  });

  it('should fail if horaInicio is in wrong format', async () => {
    const dto = new CreatePreferenciaDto();
    dto.diaSemana = 1;
    dto.horaInicio = '8h00'; // inválido
    dto.horaFim = '12:00:00';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('horaInicio');
  });

  it('should fail if horaFim is in wrong format', async () => {
    const dto = new CreatePreferenciaDto();
    dto.diaSemana = 1;
    dto.horaInicio = '08:00:00';
    dto.horaFim = '12:60:00'; // inválido

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('horaFim');
  });

  it('should fail if usuarioId is not an integer', async () => {
    const dto = new CreatePreferenciaDto();
    dto.diaSemana = 1;
    dto.horaInicio = '08:00:00';
    dto.horaFim = '12:00:00';
    // @ts-ignore
    dto.usuarioId = 'not-a-number';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.property === 'usuarioId')).toBe(true);
  });

  it('should fail if quadroId is not an integer', async () => {
    const dto = new CreatePreferenciaDto();
    dto.diaSemana = 1;
    dto.horaInicio = '08:00:00';
    dto.horaFim = '12:00:00';
    // @ts-ignore
    dto.quadroId = 'not-a-number';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.property === 'quadroId')).toBe(true);
  });
});
