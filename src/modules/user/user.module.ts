import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRegisterHandler } from './commands/user-register.comand';
import { UserService } from './services/user.service';
import { AuthModule } from '../../common/auth/auth.module';

export const handlers = [UserRegisterHandler];

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
    exports: [],
    providers: [...handlers, UserService],
    controllers: [],
})
export class UserModule {}
