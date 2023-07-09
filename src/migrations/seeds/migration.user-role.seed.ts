import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { RBACUserRoleService } from '../../common/authorization/rbac/services/rbac.user-role.service';
import { RBACRoleService } from '../../common/authorization/rbac/services/rbac.role.service';
import { ENUM_RBAC_ROLE_TYPE } from '../../common/authorization/rbac/constants/rbac.enum.role.constant';
import { UserService } from '../../modules/user/services/user.service';

@Injectable()
export class MigrationUserRoleSeed {
    constructor(
        // private readonly userRoleService: RBACUserRoleService,
        private readonly roleService: RBACRoleService,
        private readonly userService: UserService
    ) {}

    @Command({ command: 'seed:user-role', describe: 'seeds user roles' })
    async seeds(): Promise<void> {
        try {
            const [superAdminRole, adminRole, userRole] = await Promise.all([
                this.roleService.findOneByName(ENUM_RBAC_ROLE_TYPE.SUPER_ADMIN),
                this.roleService.findOneByName(ENUM_RBAC_ROLE_TYPE.ADMIN),
                this.roleService.findOneByName(ENUM_RBAC_ROLE_TYPE.USER),
            ]);

            const [superAdmin, admin, user] = await Promise.all([
                this.userService.findOneByUsername('superadmin'),
                this.userService.findOneByUsername('admin'),
                this.userService.findOneByUsername('user'),
            ]);

            console.log(superAdminRole);
            console.log(adminRole);
            console.log(userRole);

            console.log(superAdmin);
            console.log(admin);
            console.log(user);
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    @Command({ command: 'remove:user-role', describe: 'remove user roles' })
    async remove(): Promise<void> {
        try {
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
