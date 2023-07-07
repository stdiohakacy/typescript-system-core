import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { IRoleService } from '../interfaces/role.service.interface';

@Injectable()
export class RoleService implements IRoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private roleRepo: Repository<RoleEntity>
    ) {}

    async findOneByName(name: string): Promise<RoleEntity> {
        return await this.roleRepo.findOne({ where: { name } });
    }

    async createRaw(data: any) {
        await this.roleRepo.save(data);
    }

    async deleteMany(find: Record<string, any>) {
        await this.roleRepo.delete(find);
    }
}
