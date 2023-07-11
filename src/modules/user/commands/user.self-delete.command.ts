import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { ENUM_ERROR_STATUS_CODE_ERROR } from '../../../common/error/constants/error.status-code.constant';

export class UserSelfDeleteCommand implements ICommand {
    constructor(public readonly userAuth: UserEntity) {}
}

@CommandHandler(UserSelfDeleteCommand)
export class UserSelfDeleteHandler
    implements ICommandHandler<UserSelfDeleteCommand>
{
    constructor(private readonly userService: UserService) {}

    async execute({ userAuth }: UserSelfDeleteCommand): Promise<void> {
        try {
            console.log('lkasjfsjfsalfjkdfj');
            // await this.userService.inactivePermanent(userAuth);
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                _error: err.message,
            });
        }
        return;
    }
}
