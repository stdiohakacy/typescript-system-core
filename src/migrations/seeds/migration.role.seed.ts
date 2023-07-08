import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { RBACRoleService } from '../../common/authorization/rbac/services/rbac.role.service';
import { ENUM_RBAC_ROLE_TYPE } from '../../common/authorization/rbac/constants/rbac.enum.role.constant';

@Injectable()
export class MigrationRoleSeed {
    constructor(private readonly roleService: RBACRoleService) {}

    @Command({ command: 'seed:role', describe: 'seeds roles' })
    async seeds(): Promise<void> {
        const roleTypes = [
            ENUM_RBAC_ROLE_TYPE.SUPER_ADMIN,
            ENUM_RBAC_ROLE_TYPE.ADMIN,
            ENUM_RBAC_ROLE_TYPE.USER,
        ];

        try {
            for (const roleType of roleTypes) {
                await this.roleService.createRaw({ name: roleType });
            }
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    @Command({ command: 'remove:role', describe: 'remove roles' })
    async remove(): Promise<void> {
        try {
            await this.roleService.deleteMany({});
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
