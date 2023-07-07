import { Module } from '@nestjs/common';
import { RBACModule } from './rbac/rbac.module';

@Module({
    providers: [],
    exports: [RBACModule],
    controllers: [],
    imports: [RBACModule],
})
export class AuthorizationModule {}
