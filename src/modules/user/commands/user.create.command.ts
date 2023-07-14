import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';
import { UserCreateDTO } from '../dtos/user.create.dto';
import { ENUM_RBAC_ROLE_STATUS_CODE_ERROR } from '../../../common/authorization/rbac/constants/rbac.role.status-code.constant';
import { RBACRoleService } from '../../../common/authorization/rbac/services/rbac.role.service';
import { IAuthPassword } from '../../../common/authentication/interfaces/auth.interface';
import { AuthService } from '../../../common/authentication/services/auth.service';
import { ENUM_USER_SIGN_UP_FROM } from '../constants/user.enum.constant';
import { RBACUserRoleService } from '../../../common/authorization/rbac/services/rbac.user-role.service';

export class UserCreateCommand implements ICommand {
    constructor(public readonly payload: UserCreateDTO) {}
}

@CommandHandler(UserCreateCommand)
export class UserCreateHandler implements ICommandHandler<UserCreateCommand> {
    constructor(
        private readonly userService: UserService,
        private readonly roleService: RBACRoleService,
        private readonly authService: AuthService,
        private readonly userRoleService: RBACUserRoleService
    ) {}

    async execute({ payload }: UserCreateCommand) {
        const { email, phone, roleId, ...body } = payload;
        const promises: Promise<any>[] = [
            this.roleService.findOneById(roleId),
            this.userService.findOneByEmail(email),
        ];

        if (phone) {
            promises.push(this.userService.findOneByPhone(phone));
        }

        const [isRoleExist, isEmailExist, isPhoneExist] = await Promise.all(
            promises
        );

        if (!isRoleExist) {
            throw new NotFoundException({
                statusCode:
                    ENUM_RBAC_ROLE_STATUS_CODE_ERROR.ROLE_NOT_FOUND_ERROR,
                message: 'role.error.notFound',
            });
        } else if (isEmailExist) {
            throw new ConflictException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_EMAIL_EXIST_ERROR,
                message: 'user.error.emailExist',
            });
        } else if (isPhoneExist) {
            throw new ConflictException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_MOBILE_NUMBER_EXIST_ERROR,
                message: 'user.error.mobileNumberExist',
            });
        }

        const password: IAuthPassword = await this.authService.createPassword(
            body.password
        );

        const userCreated: UserEntity = await this.userService.create(
            {
                email,
                phone,
                signUpFrom: ENUM_USER_SIGN_UP_FROM.LOCAL,
                ...body,
            },
            password
        );

        await this.userRoleService.create({ userId: userCreated.id, roleId });

        return { data: { id: userCreated.id } };
    }
}
