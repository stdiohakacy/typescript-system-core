import { DeleteResult } from 'typeorm';

export interface IUserRoleService {
    create(
        payload:
            | { userId: string; roleId: string }
            | { userId: string; roleId: string }[]
    ): Promise<void>;
    deleteMany(find: Record<string, any>): Promise<DeleteResult>;
}
