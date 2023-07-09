import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoleEntity } from 'src/modules/rbac/entities/user-role.entity';
import { IRBACUserRoleService } from '../interfaces/rbac.user-role.service.interface';
import { UserRoleCreateRawDTO } from '../dtos/user-role.create-raw.dto';

@Injectable()
export class RBACUserRoleService implements IRBACUserRoleService {
    constructor(
        @InjectRepository(UserRoleEntity)
        private userRoleRepo: Repository<UserRoleEntity>
    ) {}

    async createRaw({
        userId,
        roleId,
    }: UserRoleCreateRawDTO): Promise<UserRoleEntity> {
        throw new Error();
    }
    async deleteMany(find: Record<string, any>): Promise<DeleteResult> {
        throw new Error();
    }
}
