import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { RBACRoleService } from '../../common/authorization/rbac/services/rbac.role.service';
import { ENUM_RBAC_ROLE_TYPE } from '../../common/authorization/rbac/constants/rbac.enum.role.constant';
import { UserEntity } from '../../modules/user/entities/user.entity';
import { UserService } from '../../modules/user/services/user.service';
import { RBACUserRoleService } from '../../common/authorization/rbac/services/rbac.user-role.service';

@Injectable()
export class MigrationUserRoleSeed {
    constructor(
        private readonly roleService: RBACRoleService,
        private readonly userRoleService: RBACUserRoleService,
        private readonly userService: UserService
    ) {}

    @Command({ command: 'seed:user:role', describe: 'seeds user roles' })
    async seeds(): Promise<void> {
        try {
            const roleNames = [
                ENUM_RBAC_ROLE_TYPE.SUPER_ADMIN,
                ENUM_RBAC_ROLE_TYPE.ADMIN,
                ENUM_RBAC_ROLE_TYPE.USER,
            ];

            const roles = await this.getRoles(roleNames);
            const users = await this.getUsers(['superadmin', 'admin', 'user']);

            await Promise.all(
                users.map((user, index) =>
                    this.createUserRole(user.id, roles[index].id)
                )
            );
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    private async getRoles(roleNames: string[]): Promise<any[]> {
        return Promise.all(
            roleNames.map((roleName) =>
                this.roleService.findOneByName(roleName)
            )
        );
    }

    private async getUsers(usernames: string[]): Promise<UserEntity[]> {
        return Promise.all(
            usernames.map((username) =>
                this.userService.findOneByUsername<UserEntity>(username)
            )
        );
    }

    private async createUserRole(
        userId: string,
        roleId: string
    ): Promise<void> {
        await this.userRoleService.createRaw({ userId, roleId });
    }

    @Command({ command: 'remove:user:role', describe: 'remove roles' })
    async remove(): Promise<void> {
        try {
            await this.userRoleService.deleteMany({});
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
