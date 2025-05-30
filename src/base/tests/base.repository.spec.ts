import { Model, ModelCtor } from 'sequelize-typescript';
import { BaseRepository } from '../base.repository';

describe('BaseRepository', () => {
  let mockModel: Partial<ModelCtor<Model>>;
  let repository: BaseRepository<Model>;

  const primaryKeyField = 'customId';

  beforeEach(() => {
    mockModel = {
      getAttributes: jest.fn().mockReturnValue({
        [primaryKeyField]: { primaryKey: true },
      }),
      create: jest.fn().mockResolvedValue({}),
      findAll: jest.fn().mockResolvedValue([]),
      findByPk: jest.fn().mockResolvedValue(null),
      update: jest.fn().mockResolvedValue([1, [{}]]),
      destroy: jest.fn().mockResolvedValue(1),
      findAndCountAll: jest.fn().mockResolvedValue({ rows: [], count: 0 }),
      name: 'MockModel',
    } as unknown as ModelCtor<Model>;

    repository = new BaseRepository<Model>(mockModel as ModelCtor<Model>);
  });

  it('should create a record', async () => {
    const data = { nome: 'Teste' };
    await repository.create(data as any);
    expect(mockModel.create).toHaveBeenCalledWith(data);
  });

  it('should return all records', async () => {
    await repository.findAll();
    expect(mockModel.findAll).toHaveBeenCalled();
  });

  it('should find a record by primary key', async () => {
    const id = 123;
    await repository.findOne(id);
    expect(mockModel.findByPk).toHaveBeenCalledWith(id);
  });

  it('should update a record by primary key', async () => {
    const id = 1;
    const data = { nome: 'Atualizado' };
    await repository.update(id, data);
    expect(mockModel.update).toHaveBeenCalledWith(data, {
      where: { [primaryKeyField]: id },
      returning: true,
    });
  });

  it('should remove a record by primary key', async () => {
    const id = 10;
    await repository.remove(id);
    expect(mockModel.destroy).toHaveBeenCalledWith({
      where: { [primaryKeyField]: id },
    });
  });

  it('should find records with pagination', async () => {
    const limit = 10;
    const offset = 20;
    const options = { where: { ativo: true } };

    const expectedResult = { rows: [], count: 0 };
    (mockModel.findAndCountAll as jest.Mock).mockResolvedValue(expectedResult);

    const result = await repository.findWithPagination(limit, offset, options);

    expect(mockModel.findAndCountAll).toHaveBeenCalledWith({
      limit,
      offset,
      ...options,
    });
    expect(result).toEqual(expectedResult);
  });

  it('should throw if no primary key is found', () => {
    const badModel = {
      getAttributes: jest.fn().mockReturnValue({}),
      name: 'BadModel',
    } as unknown as ModelCtor<Model>;

    expect(() => new BaseRepository<Model>(badModel)).toThrowError(
      'Primary key not found in model BadModel',
    );
  });
});
