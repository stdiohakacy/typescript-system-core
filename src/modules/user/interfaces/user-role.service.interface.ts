import { DeleteResult } from 'typeorm';

export interface IUserRoleService {
    create(userId: string, roleId: string): Promise<void>;
    deleteMany(find: Record<string, any>): Promise<DeleteResult>;
}
