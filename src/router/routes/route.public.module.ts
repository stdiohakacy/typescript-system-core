import { UserModule } from '../../modules/user/user.module';
import { UserPublicController } from '../../modules/user/controllers/user.controller';
import { Module } from '@nestjs/common';

@Module({
    controllers: [UserPublicController],
    providers: [],
    exports: [],
    imports: [UserModule],
})
export class RoutesPublicModule {}
