import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { BaseRepository } from '../../../common/base/repository/base.repository';
import { UserEntity } from './../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class UserRepository<UserEntity> extends BaseRepository<UserEntity> {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>
    ) {
        super();
    }

    async find(): Promise<UserEntity[]> {
        return await this.userRepo.createQueryBuilder('users').getMany();
    }
    async findOneById(id: string): Promise<UserEntity> {
        return await this.userRepo
            .createQueryBuilder('users')
            .where('user.id = :id', { id })
            .getOne();
    }
    async create(user: UserEntity): Promise<InsertResult> {
        return await this.userRepo
            .createQueryBuilder('users')
            .insert()
            .into(UserEntity)
            .values(user)
            .execute();
    }
    async update(id: string, user: Partial<UserEntity>): Promise<UpdateResult> {
        return await this.userRepo
            .createQueryBuilder()
            .update(UserEntity)
            .set(user)
            .where('id = :id', { id })
            .execute();
    }

    async delete(id: string): Promise<DeleteResult> {
        return await this.userRepo
            .createQueryBuilder('users')
            .delete()
            .from(UserEntity)
            .where('id = :id', { id })
            .execute();
    }
}
