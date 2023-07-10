import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from '../services/user.service';
import {
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';
import { ENUM_USER_STATUS } from '../constants/user.enum.constant';
import { ENUM_ERROR_STATUS_CODE_ERROR } from '../../../common/error/constants/error.status-code.constant';
import { UserPayloadSerialization } from '../serializations/user.payload.serialization';
import { IAuthGooglePayload } from '../../../common/authentication/interfaces/auth.interface';
import { AuthService } from '../../../common/authentication/services/auth.service';
import { ENUM_AUTH_LOGIN_WITH } from '../../../common/authentication/constants/auth.enum.constant';

export class UserLoginGoogleCallbackCommand implements ICommand {
    constructor(public readonly authGooglePayload: IAuthGooglePayload) {}
}

@CommandHandler(UserLoginGoogleCallbackCommand)
export class UserLoginGoogleCallbackHandler
    implements ICommandHandler<UserLoginGoogleCallbackCommand>
{
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {}

    async execute({ authGooglePayload }: UserLoginGoogleCallbackCommand) {
        const {
            email,
            accessToken: googleAccessToken,
            refreshToken: googleRefreshToken,
        } = authGooglePayload;
        const user = await this.userService.findOneByEmail(email);

        if (!user) {
            throw new NotFoundException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
                message: 'user.error.notFound',
            });
        } else if (user.blocked) {
            throw new ForbiddenException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_BLOCKED_ERROR,
                message: 'user.error.blocked',
            });
        } else if (user.status !== ENUM_USER_STATUS.ACTIVE) {
            throw new ForbiddenException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_INACTIVE_ERROR,
                message: 'user.error.inactive',
            });
        }

        try {
            await this.userService.updateGoogleSSO(user, {
                accessToken: googleAccessToken,
                refreshToken: googleRefreshToken,
            });
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                _error: err.message,
            });
        }

        const payload: UserPayloadSerialization =
            await this.userService.payloadSerialization(user);
        const tokenType: string = await this.authService.getTokenType();
        const expiresIn: number =
            await this.authService.getAccessTokenExpirationTime();
        const payloadAccessToken: Record<string, any> =
            await this.authService.createPayloadAccessToken(payload);
        const payloadRefreshToken: Record<string, any> =
            await this.authService.createPayloadRefreshToken(payload.id, {
                loginWith: ENUM_AUTH_LOGIN_WITH.GOOGLE,
            });

        const payloadEncryption = await this.authService.getPayloadEncryption();
        let payloadHashedAccessToken: Record<string, any> | string =
            payloadAccessToken;
        let payloadHashedRefreshToken: Record<string, any> | string =
            payloadRefreshToken;

        if (payloadEncryption) {
            payloadHashedAccessToken =
                await this.authService.encryptAccessToken(payloadAccessToken);
            payloadHashedRefreshToken =
                await this.authService.encryptRefreshToken(payloadRefreshToken);
        }

        const accessToken: string = await this.authService.createAccessToken(
            payloadHashedAccessToken
        );

        const refreshToken: string = await this.authService.createRefreshToken(
            payloadHashedRefreshToken
        );

        return {
            data: {
                tokenType,
                expiresIn,
                accessToken,
                refreshToken,
            },
        };
    }
}
