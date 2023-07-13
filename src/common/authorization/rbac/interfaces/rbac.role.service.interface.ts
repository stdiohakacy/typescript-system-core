import { DeleteResult } from 'typeorm';
import { RoleEntity } from '../../../../modules/rbac/entities/role.entity';
import { RoleCreateRawDTO } from '../dtos/role.create-raw.dto';

export interface IRBACRoleService {
    createRaw({ name }: RoleCreateRawDTO): Promise<RoleEntity>;
    findOneByName(name: string): Promise<RoleEntity>;
    findOneById(id: string): Promise<RoleEntity>;
    deleteMany(find: Record<string, any>): Promise<DeleteResult>;
}
