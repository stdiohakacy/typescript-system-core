import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UserActiveDTO } from '../dtos/user.active';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';
import { UserStatus } from '../constants/user.enum.constant';
import { BadRequestException } from '@nestjs/common';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';

export class UserActiveCommand implements ICommand {
    constructor(public readonly payload: UserActiveDTO) {}
}

@CommandHandler(UserActiveCommand)
export class UserActiveHandler implements ICommandHandler<UserActiveCommand> {
    constructor(private readonly userService: UserService) {}

    async execute({ payload }: UserActiveCommand): Promise<void> {
        const { username, activeKey } = payload;

        const user = await this.userService.findOneByUsername<UserEntity>(
            username
        );
        if (
            !user ||
            user.activeKey !== activeKey ||
            user.status === UserStatus.ACTIVE
        ) {
            throw new BadRequestException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_IS_ACTIVE_ERROR,
                message: 'user.error.isActiveInvalid',
            });
        }

        if (!user.activeExpire || user.activeExpire < new Date()) {
            throw new BadRequestException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_ACTIVE_KEY_EXPIRED_ERROR,
                message: 'user.error.activeKeyExpired',
            });
        }

        await this.userService.active(user);
    }
}
