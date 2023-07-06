import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { IAuthGooglePayload } from '../../auth/interfaces/auth.interface';
import { UserService } from '../services/user.service';
import {
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';
import { AuthService } from '../../auth/services/auth.service';
import { ENUM_USER_SIGN_UP_FROM } from '../constants/user.enum.constant';
import { ENUM_ERROR_STATUS_CODE_ERROR } from '../../../common/error/constants/error.status-code.constant';

export class UserSignUpGoogleCallbackCommand implements ICommand {
    constructor(public readonly payload: IAuthGooglePayload) {}
}

@CommandHandler(UserSignUpGoogleCallbackCommand)
export class UserSignUpGoogleCallbackHandler
    implements ICommandHandler<UserSignUpGoogleCallbackCommand>
{
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {}
    async execute({ payload }: UserSignUpGoogleCallbackCommand) {
        const { email, firstName, lastName, accessToken, refreshToken } =
            payload;

        const isEmailExist = await this.userService.findOneByEmail(email);
        if (isEmailExist) {
            throw new ConflictException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_EMAIL_EXIST_ERROR,
                message: 'user.error.emailExist',
            });
        }

        try {
            const passwordString =
                await this.authService.createPasswordRandom();
            const password = await this.authService.createPassword(
                passwordString
            );

            const user = await this.userService.create(
                {
                    email,
                    firstName,
                    lastName,
                    password: passwordString,
                    signUpFrom: ENUM_USER_SIGN_UP_FROM.GOOGLE,
                    username: '',
                    phone: '',
                },
                password
            );

            await this.userService.updateGoogleSSO(user, {
                accessToken,
                refreshToken,
            });
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                _error: err.message,
            });
        }
    }
}
