import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UserResetPasswordDTO } from '../dtos/user.reset-password.dto';
import { UserService } from '../services/user.service';
import { BadRequestException } from '@nestjs/common';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';
import { UserEntity } from '../entities/user.entity';
import { UserStatus } from '../constants/user.enum.constant';

export class UserResetPasswordCommand implements ICommand {
    constructor(public readonly payload: UserResetPasswordDTO) {}
}

@CommandHandler(UserResetPasswordCommand)
export class UserResetPasswordHandler
    implements ICommandHandler<UserResetPasswordCommand>
{
    constructor(private readonly userService: UserService) {}

    async execute({ payload }: UserResetPasswordCommand): Promise<void> {
        const { username, forgotKey } = payload;
        const user = await this.userService.findOneByUsername<UserEntity>(
            username
        );
        if (!user) {
            throw new BadRequestException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
                message: 'user.error.notFound',
            });
        }
        if (user.status !== UserStatus.ACTIVE) {
            throw new BadRequestException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_INACTIVE_ERROR,
                message: 'user.error.inactive',
            });
        }
        if (user.forgotKey !== forgotKey) {
            throw new BadRequestException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_FORGOT_KEY_INVALID_ERROR,
                message: 'user.error.forgotKeyInvalid',
            });
        }
        if (!user.forgotExpire || user.forgotExpire < new Date()) {
            throw new BadRequestException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_FORGOT_KEY_EXPIRED_ERROR,
                message: 'user.error.forgotKeyExpired',
            });
        }

        await this.userService.resetPassword(user, payload);
    }
}
