import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { RBACRoleService } from '../../common/authorization/rbac/services/rbac.role.service';
import { ENUM_RBAC_ROLE_TYPE } from '../../common/authorization/rbac/constants/rbac.enum.role.constant';
import { AuthService } from '../../modules/auth/services/auth.service';
import { UserService } from '../../modules/user/services/user.service';
import { ENUM_USER_SIGN_UP_FROM } from 'src/modules/user/constants/user.enum.constant';

@Injectable()
export class MigrationUserSeed {
    constructor(
        private readonly rbacRoleService: RBACRoleService,
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Command({ command: 'seed:user', describe: 'seed users' })
    async seeds(): Promise<void> {
        // const password = 'cdef3456@A';
        // const superAdminRole = await this.rbacRoleService.findOneByName(
        //     ENUM_RBAC_ROLE_TYPE.SUPER_ADMIN
        // );
        // const adminRole = await this.rbacRoleService.findOneByName(
        //     ENUM_RBAC_ROLE_TYPE.ADMIN
        // );
        // const userRole = await this.rbacRoleService.findOneByName(
        //     ENUM_RBAC_ROLE_TYPE.USER
        // );
        // const passwordHash = await this.authService.createPassword(password);
        // const superAdmin = this.userService.create(
        //     {
        //         firstName: 'Super',
        //         lastName: 'Admin',
        //         email: 'superadmin@gmail.com',
        //         password,
        //         phone: '08111111222',
        //         signUpFrom: ENUM_USER_SIGN_UP_FROM.LOCAL,
        //         username: 'superadmin',
        //     },
        //     passwordHash
        // );
        // const admin = this.userService.create(
        //     {
        //         firstName: 'Normal',
        //         lastName: 'Admin',
        //         email: 'admin@gmail.com',
        //         password,
        //         phone: '08111111223',
        //         signUpFrom: ENUM_USER_SIGN_UP_FROM.LOCAL,
        //         username: 'admin',
        //     },
        //     passwordHash
        // );
        // const user = this.userService.create(
        //     {
        //         firstName: 'Normal',
        //         lastName: 'User',
        //         email: 'user@gmail.com',
        //         password,
        //         phone: '08111111224',
        //         signUpFrom: ENUM_USER_SIGN_UP_FROM.LOCAL,
        //         username: 'user',
        //     },
        //     passwordHash
        // );
    }

    @Command({ command: 'remove:user', describe: 'remove users' })
    async remove(): Promise<void> {
        try {
            // await this.userService.deleteMany({});
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }
}
