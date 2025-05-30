import { Model } from 'sequelize-typescript';
import { BaseRepository } from '../base.repository';
import { BaseService } from '../base.service';
import { ApiError } from '../base.error';

class MockModel extends Model {
  declare id: number;
  declare nome: string;
}

type CreateDto = { nome: string };

describe('BaseService', () => {
  let service: BaseService<MockModel, CreateDto>;
  let repository: jest.Mocked<BaseRepository<MockModel>>;

  const mockEntity = { id: 1, nome: 'Teste' } as unknown as MockModel;

  beforeEach(() => {
    repository = {
      create: jest.fn().mockResolvedValue(mockEntity),
      findAll: jest.fn().mockResolvedValue([mockEntity]),
      findOne: jest.fn().mockResolvedValue(mockEntity),
      update: jest.fn().mockResolvedValue([1, [mockEntity]]),
      remove: jest.fn().mockResolvedValue(1),
    } as unknown as jest.Mocked<BaseRepository<MockModel>>;

    service = new BaseService<MockModel, CreateDto>(repository);
  });

  it('should create a new entity', async () => {
    const data: CreateDto = { nome: 'Teste' };
    const result = await service.create(data);

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

  it('should throw ApiError when entity is not found in findOne', async () => {
    repository.findOne.mockResolvedValueOnce(null);

    const resultPromise = service.findOne(999);

    await expect(resultPromise).rejects.toThrow(ApiError);
    await expect(resultPromise).rejects.toThrow(
      'The resource sought with this identifier is not found in the application!',
    );
  });

  it('should update an entity by id', async () => {
    const updateData = { nome: 'Atualizado' };
    const result = await service.update(1, updateData as any);

    expect(repository.update).toHaveBeenCalledWith(1, updateData);
    expect(result).toEqual([1, [mockEntity]]);
  });

  it('should remove an entity by id', async () => {
    const result = await service.remove(1);

    expect(repository.findOne).toHaveBeenCalledWith(1);
    expect(repository.remove).toHaveBeenCalledWith(1);
    expect(result).toBe(1);
  });

  it('should throw ApiError when entity is not found in remove', async () => {
    repository.findOne.mockResolvedValueOnce(null);

    const resultPromise = service.remove(999);

    await expect(resultPromise).rejects.toThrow(ApiError);
    await expect(resultPromise).rejects.toThrow(
      'The resource to be deleted, with that identifier is not found in the application!',
    );
  });
});
