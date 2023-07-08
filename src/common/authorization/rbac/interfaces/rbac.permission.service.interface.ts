import { PermissionEntity } from '../../../../modules/rbac/entities/permission.entity';
import { DeleteResult } from 'typeorm';
import { PermissionCreateRawDTO } from '../dtos/permission.create-raw.dto';

export interface IRBACPermissionService {
    createRaw({ name }: PermissionCreateRawDTO): Promise<PermissionEntity>;
    findOneByName(name: string): Promise<PermissionEntity>;
    deleteMany(find: Record<string, any>): Promise<DeleteResult>;
}
