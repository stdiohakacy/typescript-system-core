import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApiKeyModule } from '../../modules/api-key/api-key.module';
import { ApiKeyAdminController } from '../../modules/api-key/controllers/api-key.admin.controller';
import { UserAdminController } from '../../modules/user/controllers/user.admin.controller';
import { PaginationModule } from '../../common/pagination/pagination.module';

@Module({
    controllers: [ApiKeyAdminController, UserAdminController],
    providers: [],
    exports: [],
    imports: [ApiKeyModule, CqrsModule, PaginationModule],
})
export class RoutesAdminModule {}
