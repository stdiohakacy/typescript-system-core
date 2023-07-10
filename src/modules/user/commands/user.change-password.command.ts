import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';
import { UserChangePasswordDTO } from '../dtos/user.change-password.dto';
import { SettingService } from '../../../modules/setting/services/setting.service';
import { AuthService } from '../../../common/authentication/services/auth.service';
import { IAuthPassword } from '../../../common/authentication/interfaces/auth.interface';

export class UserChangePasswordCommand implements ICommand {
    constructor(
        public readonly userAuth: UserEntity,
        public readonly payload: UserChangePasswordDTO
    ) {}
}

@CommandHandler(UserChangePasswordCommand)
export class UserChangePasswordHandler
    implements ICommandHandler<UserChangePasswordCommand>
{
    constructor(
        private readonly userService: UserService,
        private readonly settingService: SettingService,
        private readonly authService: AuthService
    ) {}

    async execute({
        payload,
        userAuth,
    }: UserChangePasswordCommand): Promise<void> {
        const { oldPassword, newPassword } = payload;

        const passwordAttempt: boolean =
            await this.settingService.getPasswordAttempt();
        const maxPasswordAttempt: number =
            await this.settingService.getMaxPasswordAttempt();
        if (passwordAttempt && userAuth.passwordAttempt >= maxPasswordAttempt) {
            throw new ForbiddenException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_PASSWORD_ATTEMPT_MAX_ERROR,
                message: 'user.error.passwordAttemptMax',
            });
        }

        const matchPassword: boolean = await this.authService.validateUser(
            oldPassword,
            userAuth.password
        );
        if (!matchPassword) {
            await this.userService.increasePasswordAttempt(userAuth);

            throw new BadRequestException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_PASSWORD_NOT_MATCH_ERROR,
                message: 'user.error.passwordNotMatch',
            });
        }

        const newMatchPassword: boolean = await this.authService.validateUser(
            newPassword,
            userAuth.password
        );
        if (newMatchPassword) {
            throw new BadRequestException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_PASSWORD_NEW_MUST_DIFFERENCE_ERROR,
                message: 'user.error.newPasswordMustDifference',
            });
        }

        await this.userService.resetPasswordAttempt(userAuth);

        const password: IAuthPassword = await this.authService.createPassword(
            newPassword
        );

        await this.userService.updatePassword(userAuth, password);
    }
}
