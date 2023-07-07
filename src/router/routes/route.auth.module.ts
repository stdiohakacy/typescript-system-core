import { Module } from '@nestjs/common';
import { UserAuthController } from '../../modules/user/controllers/user.auth.controller';
import { UserModule } from '../../modules/user/user.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from '../../modules/auth/auth.module';
import { AuthorizationModule } from 'src/common/authorization/authorization.module';

@Module({
    controllers: [UserAuthController],
    providers: [],
    exports: [],
    imports: [UserModule, AuthModule, CqrsModule, AuthorizationModule],
})
export class RoutesAuthModule {}
