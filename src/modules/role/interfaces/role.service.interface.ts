import { RoleEntity } from '../entities/role.entity';

export interface IRoleService {
    createRaw(data: any): Promise<void>;
    deleteMany(find: Record<string, any>): Promise<void>;
    findOneByName(name: string): Promise<RoleEntity>;
}
