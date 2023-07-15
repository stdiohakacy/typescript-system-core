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
import { UserGetHandler } from './queries/user.get.query';
import { UserCreateHandler } from './commands/user.create.command';
import { RBACCommonModule } from 'src/common/authorization/rbac/rbac.module';
import { UserUpdateNameHandler } from './commands/user.update-name.command';
import { UserInActiveHandler } from './commands/user.inactive.command';
import { UserForceActiveHandler } from './commands/user.force-active.command';
import { UserBlockHandler } from './commands/user.block.command';
import { UserForceDeleteHandler } from './commands/user.force-delete.command';
import { UserImportHandler } from './commands/user.import.command';
import { UserExportHandler } from './commands/user.export.command';

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
    UserCreateHandler,
    UserUpdateNameHandler,
    UserInActiveHandler,
    UserForceActiveHandler,
    UserBlockHandler,
    UserForceDeleteHandler,
    UserImportHandler,
    UserExportHandler,
];

export const queryHandlers = [UserListHandler, UserGetHandler];

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        AuthModule,
        MailModule,
        SettingModule,
        IntegrationModule,
        AuthorizationModule,
        PaginationModule,
        RBACCommonModule,
    ],
    exports: [UserService],
    providers: [...commandHandlers, ...queryHandlers, UserService],
    controllers: [],
})
export class UserModule {}
