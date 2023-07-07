import { Injectable } from '@nestjs/common';
import { UserRoleEntity } from '../entities/user-role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { IUserRoleService } from '../interfaces/user-role.service.interface';

@Injectable()
export class UserRoleService implements IUserRoleService {
    constructor(
        @InjectRepository(UserRoleEntity)
        private userRoleRepo: Repository<UserRoleEntity>
    ) {}

    async create(userId: string, roleId: string): Promise<void> {
        await this.userRoleRepo.save({ userId, roleId });
    }

    async deleteMany(find: Record<string, any>): Promise<DeleteResult> {
        return await this.userRoleRepo.delete(find);
    }
}
