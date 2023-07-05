import { Module } from '@nestjs/common';
import { UserAuthController } from '../../modules/user/controllers/user.auth.controller';
import { UserModule } from '../../modules/user/user.module';
import { AuthModule } from '../../common/auth/auth.module';

@Module({
    controllers: [UserAuthController],
    providers: [],
    exports: [],
    imports: [UserModule, AuthModule],
})
export class RoutesAuthModule {}
