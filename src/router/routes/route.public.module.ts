import { UserModule } from '../../modules/user/user.module';
import { UserPublicController } from '../../modules/user/controllers/user.public.controller';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    controllers: [UserPublicController],
    providers: [],
    exports: [],
    imports: [UserModule, CqrsModule],
})
export class RoutesPublicModule {}
