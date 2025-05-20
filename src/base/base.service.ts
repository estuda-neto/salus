import { InferCreationAttributes } from 'sequelize';
import { BaseRepository } from './base.repository';
import { Model } from 'sequelize-typescript';

export class BaseService<T extends Model, C> {
  constructor(protected readonly repository: BaseRepository<T>) { }

  async create(createDto: C): Promise<T> {
    const resource = createDto as InferCreationAttributes<T>;
    return await this.repository.create(resource);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.findAll();
  }

  async findOne(id: number): Promise<T | null> {
    return await this.repository.findOne(id);
  }

  async update(id: number, data: Partial<T>): Promise<[number, T[]]> {
    return await this.repository.update(id, data);
  }

  async remove(id: number): Promise<number> {
    return await this.repository.remove(id);
  }
}