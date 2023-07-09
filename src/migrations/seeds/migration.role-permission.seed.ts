import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { RBACRoleService } from '../../common/authorization/rbac/services/rbac.role.service';
import { ENUM_RBAC_ROLE_TYPE } from '../../common/authorization/rbac/constants/rbac.enum.role.constant';
import { RBACPermissionService } from '../../common/authorization/rbac/services/rbac.permission.service';
import { ENUM_PERMISSION_TYPE } from '../../modules/user/constants/user.enum.constant';
import { RBACRolePermissionService } from '../../common/authorization/rbac/services/rbac.role-permission.service';

@Injectable()
export class MigrationRolePermissionSeed {
    constructor(
        private readonly roleService: RBACRoleService,
        private readonly permissionService: RBACPermissionService,
        private readonly rolePermissionService: RBACRolePermissionService
    ) {}

    @Command({
        command: 'seed:role:permission',
        describe: 'seeds role permissions',
    })
    async seeds(): Promise<void> {
        const userRole = await this.roleService.findOneByName(
            ENUM_RBAC_ROLE_TYPE.USER
        );
        const permissions = await this.permissionService.findByNames([
            ENUM_PERMISSION_TYPE.SELF_USER_DELETE,
            ENUM_PERMISSION_TYPE.USER_CREATE,
        ]);
        try {
            await Promise.all(
                permissions.map(
                    async (permission) =>
                        await this.rolePermissionService.create({
                            roleId: userRole.id,
                            permissionId: permission.id,
                        })
                )
            );
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    @Command({
        command: 'remove:role:permissions',
        describe: 'remove role permissions',
    })
    async remove(): Promise<void> {
        try {
            await this.rolePermissionService.deleteMany({});
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
