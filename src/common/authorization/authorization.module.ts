import { Module } from '@nestjs/common';
import { RBACCommonModule } from './rbac/rbac.module';

@Module({
    providers: [],
    exports: [RBACCommonModule],
    controllers: [],
    imports: [RBACCommonModule],
})
export class AuthorizationModule {}
