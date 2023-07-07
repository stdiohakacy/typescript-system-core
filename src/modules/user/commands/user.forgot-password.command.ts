import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UserActiveDTO } from '../dtos/user.active.dto';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';
import { ENUM_USER_STATUS } from '../constants/user.enum.constant';
import { BadRequestException } from '@nestjs/common';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';
import { UserForgotPasswordDTO } from '../dtos/user.forgot-password.dto';

export class UserForgotPasswordCommand implements ICommand {
    constructor(public readonly payload: UserForgotPasswordDTO) {}
}

@CommandHandler(UserForgotPasswordCommand)
export class UserForgotPasswordHandler
    implements ICommandHandler<UserForgotPasswordCommand>
{
    constructor(private readonly userService: UserService) {}

    async execute({ payload }: UserForgotPasswordCommand): Promise<void> {
        const { username } = payload;
        const user = await this.userService.findOneByUsername<UserEntity>(
            username
        );
        if (!user) {
            throw new BadRequestException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
                message: 'user.error.notFound',
            });
        }
        if (user.status !== ENUM_USER_STATUS.ACTIVE) {
            throw new BadRequestException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_INACTIVE_ERROR,
                message: 'user.error.inactive',
            });
        }

        await this.userService.forgotPassword(user);
    }
}
