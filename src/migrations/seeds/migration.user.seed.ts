import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../modules/user/services/user.service';
import { ENUM_USER_SIGN_UP_FROM } from '../../modules/user/constants/user.enum.constant';
import { AuthService } from '../../common/authentication/services/auth.service';

@Injectable()
export class MigrationUserSeed {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Command({ command: 'seed:user', describe: 'seed users' })
    async seeds(): Promise<void> {
        const password = 'cdef3456@A';
        const passwordHash = await this.authService.createPassword(password);

        const users = [
            {
                firstName: 'Super',
                lastName: 'Admin',
                email: 'superadmin@gmail.com',
                password,
                phone: '08111111222',
                signUpFrom: ENUM_USER_SIGN_UP_FROM.LOCAL,
                username: 'superadmin',
            },
            {
                firstName: 'Normal',
                lastName: 'Admin',
                email: 'admin@gmail.com',
                password,
                phone: '08111111223',
                signUpFrom: ENUM_USER_SIGN_UP_FROM.LOCAL,
                username: 'admin',
            },
            {
                firstName: 'Normal',
                lastName: 'User',
                email: 'user@gmail.com',
                password,
                phone: '08111111224',
                signUpFrom: ENUM_USER_SIGN_UP_FROM.LOCAL,
                username: 'user',
            },
        ];

        const usersResponse = await Promise.all(
            users.map(
                async (user) =>
                    await this.userService.create(user, passwordHash)
            )
        );

        for (const user of usersResponse) {
            await this.userService.active(user);
        }
    }

    @Command({ command: 'remove:user', describe: 'remove users' })
    async remove(): Promise<void> {
        try {
            await this.userService.deleteMany({});
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }
}
