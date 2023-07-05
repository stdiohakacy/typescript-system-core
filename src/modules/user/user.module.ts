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
import { AuthModule } from '../auth/auth.module';
import { UserRefreshTokenHandler } from './commands/user.refresh-token.command';

export const handlers = [
    UserRegisterHandler,
    UserLoginHandler,
    UserActiveHandler,
    UserForgotPasswordHandler,
    UserResetPasswordHandler,
    UserChangePasswordHandler,
    UserRefreshTokenHandler,
];

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        AuthModule,
        MailModule,
        SettingModule,
    ],
    exports: [UserService],
    providers: [...handlers, UserService],
    controllers: [],
})
export class UserModule {}
