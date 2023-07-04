import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRegisterHandler } from './commands/user-register.command';
import { UserService } from './services/user.service';
import { AuthModule } from '../../common/auth/auth.module';
import { MailModule } from '../../common/integration/mail/mail.module';
import { UserLoginHandler } from './commands/user-login.command';
import { SettingModule } from '../setting/setting.module';
import { UserActiveHandler } from './commands/user-active.command';

export const handlers = [
    UserRegisterHandler,
    UserLoginHandler,
    UserActiveHandler,
];

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        AuthModule,
        MailModule,
        SettingModule,
    ],
    exports: [],
    providers: [...handlers, UserService],
    controllers: [],
})
export class UserModule {}
