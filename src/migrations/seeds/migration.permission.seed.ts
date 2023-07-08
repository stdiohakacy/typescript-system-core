import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ENUM_RBAC_PERMISSION_TYPE } from '../../common/authorization/rbac/constants/rbac.enum.permission.constant';
import { RBACPermissionService } from '../../common/authorization/rbac/services/rbac.permission.service';

@Injectable()
export class MigrationPermissionSeed {
    constructor(private readonly permissionService: RBACPermissionService) {}

    @Command({ command: 'seed:permission', describe: 'seeds permissions' })
    async seeds(): Promise<void> {
        const permissionTypes = [
            ENUM_RBAC_PERMISSION_TYPE.USER_CREATE,
            ENUM_RBAC_PERMISSION_TYPE.USER_DELETE,
        ];

        try {
            for (const permissionType of permissionTypes) {
                await this.permissionService.createRaw({
                    name: permissionType,
                });
            }
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    @Command({ command: 'remove:permission', describe: 'remove permissions' })
    async remove(): Promise<void> {
        try {
            await this.permissionService.deleteMany({});
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
