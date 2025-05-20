// base.service.spec.ts
import { Model } from 'sequelize-typescript';
import { BaseRepository } from '../base.repository';
import { BaseService } from '../base.service';

describe('BaseService', () => {
  let service: BaseService<Model>;
  let repository: jest.Mocked<BaseRepository<Model>>;

  const mockEntity = { id: 1 } as unknown as Model;

  beforeEach(() => {
    // Mock do BaseRepository
    repository = {
      create: jest.fn().mockResolvedValue(mockEntity),
      findAll: jest.fn().mockResolvedValue([mockEntity]),
      findOne: jest.fn().mockResolvedValue(mockEntity),
      update: jest.fn().mockResolvedValue([1, [mockEntity]]),
      remove: jest.fn().mockResolvedValue(1),
    } as unknown as jest.Mocked<BaseRepository<Model>>;

    service = new BaseService<Model>(repository);
  });

  it('should create a new entity', async () => {
    const data = { nome: 'Teste' };
    const result = await service.create(data as any);

    expect(repository.create).toHaveBeenCalledWith(data);
    expect(result).toEqual(mockEntity);
  });

  it('should return all entities', async () => {
    const result = await service.findAll();

    expect(repository.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockEntity]);
  });

  it('should return one entity by id', async () => {
    const result = await service.findOne(1);

    expect(repository.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockEntity);
  });

  it('should update an entity by id', async () => {
    const result = await service.update(1, { nome: 'Atualizado' } as any);

    expect(repository.update).toHaveBeenCalledWith(1, { nome: 'Atualizado' });
    expect(result).toEqual([1, [mockEntity]]);
  });

  it('should remove an entity by id', async () => {
    const result = await service.remove(1);

    expect(repository.remove).toHaveBeenCalledWith(1);
    expect(result).toBe(1);
  });
});
