import { Module } from '@nestjs/common';
import { AuthModule } from '../../common/auth/auth.module';
import { ApiKeyModule } from '../../modules/api-key/api-key.module';
import { ApiKeyAdminController } from '../../modules/api-key/controllers/api-key.admin.controller';

@Module({
    controllers: [ApiKeyAdminController],
    providers: [],
    exports: [],
    imports: [ApiKeyModule],
})
export class RoutesAdminModule {}
