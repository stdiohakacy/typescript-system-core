import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ENUM_RBAC_ROLE_TYPE } from '../../common/authorization/rbac/constants/rbac.enum.constant';
import { ENUM_USER_SIGN_UP_FROM } from '../../modules/user/constants/user.enum.constant';
import { RoleService } from '../../modules/role/services/role.service';
import { AuthService } from '../../modules/auth/services/auth.service';
import { UserService } from '../../modules/user/services/user.service';
import { UserRoleService } from '../../modules/user/services/user-role.service';

@Injectable()
export class MigrationUserSeed {
    constructor(
        private readonly roleService: RoleService,
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly userRoleService: UserRoleService
    ) {}

    @Command({ command: 'seed:user', describe: 'seed users' })
    async seeds(): Promise<void> {
        const password = 'cdef3456@A';
        const passwordHashed = await this.authService.createPassword(password);

        const roles = await Promise.all([
            this.roleService.findOneByName(ENUM_RBAC_ROLE_TYPE.SUPER_ADMIN),
            this.roleService.findOneByName(ENUM_RBAC_ROLE_TYPE.ADMIN),
            this.roleService.findOneByName(ENUM_RBAC_ROLE_TYPE.USER),
        ]);

        const usersData = [
            {
                firstName: 'Super',
                lastName: 'Admin',
                email: 'superadmin@gmail.com',
                username: 'superadmin',
                password,
                phone: '+123456781',
                signUpFrom: ENUM_USER_SIGN_UP_FROM.LOCAL,
            },
            {
                firstName: 'Admin',
                lastName: 'Admin',
                email: 'admin@gmail.com',
                username: 'admin',
                password,
                phone: '+123456782',
                signUpFrom: ENUM_USER_SIGN_UP_FROM.LOCAL,
            },
            {
                firstName: 'Normal',
                lastName: 'User',
                email: 'user@gmail.com',
                username: 'user',
                password,
                phone: '+123456783',
                signUpFrom: ENUM_USER_SIGN_UP_FROM.LOCAL,
            },
        ];

        const createdUsers = await Promise.all(
            usersData.map((userData) =>
                this.userService.create(userData, passwordHashed)
            )
        );

        createdUsers.forEach(
            async (user) => await this.userService.active(user)
        );

        const userRoles = await Promise.all(
            roles.map((role, index) => ({
                userId: createdUsers[index].id,
                roleId: role.id,
            }))
        );
        await this.userRoleService.create(userRoles);
    }

    @Command({ command: 'remove:user', describe: 'remove users' })
    async remove(): Promise<void> {
        try {
            await Promise.all([
                this.userService.deleteMany({}),
                this.userRoleService.deleteMany({}),
            ]);
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
