import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UserClaimUsernameDTO } from '../dtos/user.claim-username.dto';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { ConflictException } from '@nestjs/common';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';

export class UserClaimUsernameCommand implements ICommand {
    constructor(
        public readonly userAuth: UserEntity,
        public readonly payload: UserClaimUsernameDTO
    ) {}
}

@CommandHandler(UserClaimUsernameCommand)
export class UserClaimUsernameHandler
    implements ICommandHandler<UserClaimUsernameCommand>
{
    constructor(private readonly userService: UserService) {}

    async execute({ payload, userAuth }: UserClaimUsernameCommand) {
        const user = await this.userService.findOneByUsername(payload.username);
        if (user) {
            throw new ConflictException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_USERNAME_EXISTS_ERROR,
                message: 'user.error.usernameExist',
            });
        }
        await this.userService.updateUsername(userAuth, payload);
    }
}
