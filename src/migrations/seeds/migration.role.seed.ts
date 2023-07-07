import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { RoleService } from '../../modules/role/services/role.service';
import { ENUM_RBAC_ROLE_TYPE } from '../../common/authorization/rbac/constants/rbac.enum.constant';

@Injectable()
export class MigrationRoleSeed {
    constructor(private readonly roleService: RoleService) {}

    @Command({ command: 'seed:role', describe: 'seeds roles' })
    async seeds(): Promise<void> {
        try {
            await this.roleService.createRaw({
                id: 'f957eb7c-3f93-44cc-b8d9-44426546fa2b',
                name: ENUM_RBAC_ROLE_TYPE.SUPER_ADMIN,
            });

            await this.roleService.createRaw({
                id: '531eabe1-a218-4bf9-a0f2-36b665242207',
                name: ENUM_RBAC_ROLE_TYPE.USER,
            });

            await this.roleService.createRaw({
                id: 'cbe4c0d9-5334-4bec-95a3-a923c5ae3967',
                name: ENUM_RBAC_ROLE_TYPE.ADMIN,
            });
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }

    @Command({ command: 'remove:role', describe: 'remove roles' })
    async remove(): Promise<void> {
        try {
            await this.roleService.deleteMany({});
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }
}
