import { Module } from '@nestjs/common';
import { UserAuthController } from '../../modules/user/controllers/user.auth.controller';
import { UserModule } from '../../modules/user/user.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthorizationModule } from '../../common/authorization/authorization.module';
import { AuthModule } from '../../common/authentication/auth.module';

@Module({
    controllers: [UserAuthController],
    providers: [],
    exports: [],
    imports: [UserModule, AuthModule, CqrsModule, AuthorizationModule],
})
export class RoutesAuthModule {}
