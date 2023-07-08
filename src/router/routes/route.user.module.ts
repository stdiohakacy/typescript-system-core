import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserUserController } from '../../modules/user/controllers/user.user.controller';
import { UserModule } from '../../modules/user/user.module';

@Module({
    controllers: [UserUserController],
    providers: [],
    exports: [],
    imports: [UserModule, CqrsModule],
})
export class RoutesUserModule {}
