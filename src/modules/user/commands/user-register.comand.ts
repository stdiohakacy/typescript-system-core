import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UserRegisterDTO } from '../dtos/user.register.dto';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { AuthService } from '../../../common/auth/services/auth.service';
import { IAuthPassword } from '../../../common/auth/interfaces/auth.interface';
import { ConflictException } from '@nestjs/common';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';

export class UserRegisterCommand implements ICommand {
    constructor(public readonly payload: UserRegisterDTO) {}
}

@CommandHandler(UserRegisterCommand)
export class UserRegisterHandler
    implements ICommandHandler<UserRegisterCommand, UserEntity>
{
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {}

    async execute({ payload }: UserRegisterCommand): Promise<UserEntity> {
        const usernameExist = await this.userService.findOneByUsername(
            payload.username
        );
        if (usernameExist) {
            throw new ConflictException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_USERNAME_EXISTS_ERROR,
                message: 'user.error.usernameExist',
            });
        }
        const passwordAuth: IAuthPassword =
            await this.authService.createPassword(payload.password);
        return await this.userService.create(payload, passwordAuth);
    }
}
