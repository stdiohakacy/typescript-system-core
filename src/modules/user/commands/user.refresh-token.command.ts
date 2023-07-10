import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UserEntity } from '../entities/user.entity';
import { ForbiddenException } from '@nestjs/common';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';
import { UserPayloadSerialization } from '../serializations/user.payload.serialization';
import { UserService } from '../services/user.service';
import { AuthService } from '../../../common/authentication/services/auth.service';

export class UserRefreshTokenCommand implements ICommand {
    constructor(
        public readonly userAuth: UserEntity,
        public readonly refreshToken: string
    ) {}
}

@CommandHandler(UserRefreshTokenCommand)
export class UserRefreshTokenHandler
    implements ICommandHandler<UserRefreshTokenCommand>
{
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    async execute({ userAuth, refreshToken }: UserRefreshTokenCommand) {
        const isPasswordExpired = await this.authService.checkPasswordExpired(
            userAuth.passwordExpired
        );
        if (isPasswordExpired) {
            throw new ForbiddenException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_PASSWORD_EXPIRED_ERROR,
                message: 'user.error.passwordExpired',
            });
        }

        const payload: UserPayloadSerialization =
            await this.userService.payloadSerialization(userAuth);
        const tokenType: string = await this.authService.getTokenType();
        const expiresIn: number =
            await this.authService.getAccessTokenExpirationTime();
        const payloadAccessToken: Record<string, any> =
            await this.authService.createPayloadAccessToken(payload);

        const payloadEncryption = await this.authService.getPayloadEncryption();
        let payloadHashedAccessToken: Record<string, any> | string =
            payloadAccessToken;

        if (payloadEncryption) {
            payloadHashedAccessToken =
                await this.authService.encryptAccessToken(payloadAccessToken);
        }

        const accessToken: string = await this.authService.createAccessToken(
            payloadHashedAccessToken
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
