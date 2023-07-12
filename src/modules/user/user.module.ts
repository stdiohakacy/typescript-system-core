import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRegisterHandler } from './commands/user.register.command';
import { UserService } from './services/user.service';
import { MailModule } from '../../common/integration/mail/mail.module';
import { UserLoginHandler } from './commands/user.login.command';
import { SettingModule } from '../setting/setting.module';
import { UserActiveHandler } from './commands/user.active.command';
import { UserForgotPasswordHandler } from './commands/user.forgot-password.command';
import { UserResetPasswordHandler } from './commands/user.reset-password.command';
import { UserChangePasswordHandler } from './commands/user.change-password.command';
import { UserRefreshTokenHandler } from './commands/user.refresh-token.command';
import { UserUpdateProfileHandler } from './commands/user.update-profile.command';
import { UserClaimUsernameHandler } from './commands/user.claim-username.command';
import { UserUploadHandler } from './commands/user.upload.command';
import { IntegrationModule } from '../../common/integration/integration.module';
import { UserSignUpGoogleCallbackHandler } from './commands/user.sign-up-google-callback.command';
import { UserLoginGoogleCallbackHandler } from './commands/user.login-google-callback.command';
import { UserSelfDeleteHandler } from './commands/user.self-delete.command';
import { AuthorizationModule } from '../../common/authorization/authorization.module';
import { AuthModule } from '../../common/authentication/auth.module';
import { UserListHandler } from './queries/user.list.query';
import { PaginationModule } from '../../common/pagination/pagination.module';

export const commandHandlers = [
    UserRegisterHandler,
    UserLoginHandler,
    UserActiveHandler,
    UserForgotPasswordHandler,
    UserResetPasswordHandler,
    UserChangePasswordHandler,
    UserRefreshTokenHandler,
    UserUpdateProfileHandler,
    UserClaimUsernameHandler,
    UserUploadHandler,
    UserSignUpGoogleCallbackHandler,
    UserLoginGoogleCallbackHandler,
    UserSelfDeleteHandler,
];

export const queryHandlers = [UserListHandler];

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        AuthModule,
        MailModule,
        SettingModule,
        IntegrationModule,
        AuthorizationModule,
        PaginationModule,
    ],
    exports: [UserService],
    providers: [...commandHandlers, ...queryHandlers, UserService],
    controllers: [],
})
export class UserModule {}
