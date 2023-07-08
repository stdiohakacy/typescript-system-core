import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { IUserRoleService } from '../interfaces/user-role.service.interface';

@Injectable()
export class UserRoleService implements IUserRoleService {
    create(
        payload:
            | { userId: string; roleId: string }
            | { userId: string; roleId: string }[]
    ): Promise<void> {
        throw new Error('Method not implemented.');
    }
    deleteMany(find: Record<string, any>): Promise<DeleteResult> {
        throw new Error('Method not implemented.');
    }
}
