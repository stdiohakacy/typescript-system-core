import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Response } from '../../../common/response/decorators/response.decorator';
import {
    UserPublicActiveDoc,
    UserPublicForgotPasswordDoc,
    UserPublicLoginDoc,
    UserPublicRegisterDoc,
    UserPublicResetPasswordDoc,
} from '../docs/user.public.doc';
import { UserRegisterDTO } from '../dtos/user.register.dto';
import { CommandBus } from '@nestjs/cqrs';
import { UserRegisterCommand } from '../commands/user.register.command';
import { UserLoginSerialization } from '../serializations/user.login.serialization';
import { IResponse } from '../../../common/response/interfaces/response.interface';
import { UserLoginCommand } from '../commands/user.login.command';
import { UserLoginDTO } from '../dtos/user.login.dto';
import { UserActiveDTO } from '../dtos/user.active.dto';
import { UserActiveCommand } from '../commands/user.active.command';
import { UserForgotPasswordDTO } from '../dtos/user.forgot-password.dto';
import { UserForgotPasswordCommand } from '../commands/user.forgot-password.command';
import { UserResetPasswordDTO } from '../dtos/user.reset-password.dto';
import { UserResetPasswordCommand } from '../commands/user.reset-password.command';
import {
    AuthGoogleOAuth2LoginProtected,
    AuthGoogleOAuth2SignUpProtected,
} from '../../../modules/auth/decorators/auth.google.decorator';
import { AuthJwtPayload } from 'src/modules/auth/decorators/auth.jwt-decorator';
import { IAuthGooglePayload } from 'src/modules/auth/interfaces/auth.interface';
import { UserSignUpGoogleCallbackCommand } from '../commands/user.sign-up-google-callback.command';
import { UserLoginGoogleCallbackCommand } from '../commands/user.login-google-callback.command';

@ApiTags('modules.public.user')
@Controller({
    version: '1',
    path: '/user',
})
export class UserPublicController {
    constructor(private readonly commandBus: CommandBus) {}

    @UserPublicRegisterDoc()
    @Response('user.register')
    @Post('/register')
    async register(@Body() payload: UserRegisterDTO) {
        return await this.commandBus.execute(new UserRegisterCommand(payload));
    }

    @UserPublicLoginDoc()
    @Response('user.login', { serialization: UserLoginSerialization })
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(@Body() payload: UserLoginDTO): Promise<IResponse> {
        return await this.commandBus.execute(new UserLoginCommand(payload));
    }

    @UserPublicActiveDoc()
    @Response('user.active')
    @HttpCode(HttpStatus.OK)
    @Post('/active')
    async active(@Body() payload: UserActiveDTO): Promise<IResponse> {
        return await this.commandBus.execute(new UserActiveCommand(payload));
    }

    @UserPublicForgotPasswordDoc()
    @Response('user.forgotPassword')
    @HttpCode(HttpStatus.OK)
    @Post('/forgot-password')
    async forgotPassword(
        @Body() payload: UserForgotPasswordDTO
    ): Promise<IResponse> {
        return await this.commandBus.execute(
            new UserForgotPasswordCommand(payload)
        );
    }

    @UserPublicResetPasswordDoc()
    @Response('user.resetPassword')
    @HttpCode(HttpStatus.OK)
    @Post('/reset-password')
    async resetPassword(
        @Body() payload: UserResetPasswordDTO
    ): Promise<IResponse> {
        return await this.commandBus.execute(
            new UserResetPasswordCommand(payload)
        );
    }

    @ApiExcludeEndpoint()
    @Response('user.signUpGoogle')
    @AuthGoogleOAuth2SignUpProtected()
    @Get('/sign-up/google')
    async signUpGoogle(): Promise<void> {
        return;
    }

    @ApiExcludeEndpoint()
    @Response('user.signUpGoogleCallback')
    @AuthGoogleOAuth2SignUpProtected()
    @HttpCode(HttpStatus.CREATED)
    @Get('/sign-up/google/callback')
    async signUpGoogleCallback(
        @AuthJwtPayload() payload: IAuthGooglePayload
    ): Promise<void> {
        return await this.commandBus.execute(
            new UserSignUpGoogleCallbackCommand(payload)
        );
    }

    @ApiExcludeEndpoint()
    @Response('user.loginGoogle')
    @AuthGoogleOAuth2LoginProtected()
    @Get('/login/google')
    async loginGoogle(): Promise<void> {
        return;
    }

    @ApiExcludeEndpoint()
    @Response('user.loginGoogleCallback')
    @AuthGoogleOAuth2LoginProtected()
    @Get('/login/google/callback')
    async loginGoogleCallback(
        @AuthJwtPayload() authGooglePayload: IAuthGooglePayload
    ): Promise<IResponse> {
        return this.commandBus.execute(
            new UserLoginGoogleCallbackCommand(authGooglePayload)
        );
    }
}
