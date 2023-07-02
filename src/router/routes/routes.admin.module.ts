import { Module } from '@nestjs/common';
import { AuthModule } from 'src/common/auth/auth.module';
import { ApiKeyModule } from 'src/modules/api-key/api-key.module';
import { ApiKeyAdminController } from 'src/modules/api-key/controllers/api-key.admin.controller';

@Module({
    controllers: [ApiKeyAdminController],
    providers: [],
    exports: [],
    imports: [ApiKeyModule],
})
export class RoutesAdminModule {}
