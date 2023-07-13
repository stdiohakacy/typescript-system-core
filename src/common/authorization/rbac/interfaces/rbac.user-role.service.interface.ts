import { DeleteResult, InsertResult } from 'typeorm';
import { RoleEntity } from '../../../../modules/rbac/entities/role.entity';
import { UserRoleCreateRawDTO } from '../dtos/user-role.create-raw.dto';
import { UserRoleEntity } from '../../../../modules/rbac/entities/user-role.entity';
import { UserRoleDTO } from '../dtos/user-role.dto';

export interface IRBACUserRoleService {
    createRaw({
        userId,
        roleId,
    }: UserRoleCreateRawDTO): Promise<UserRoleEntity>;
    deleteMany(find: Record<string, any>): Promise<DeleteResult>;

    create(data: UserRoleDTO);
}
