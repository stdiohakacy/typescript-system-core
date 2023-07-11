import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';

export abstract class BaseRepository<T> {
    abstract find(): Promise<T[]>;
    abstract findOneById(id: string): Promise<T>;
    abstract create(entity: T): Promise<InsertResult>;
    abstract update(id: string, entity: Partial<T>): Promise<UpdateResult>;
    abstract delete(id: string): Promise<DeleteResult>;
}
