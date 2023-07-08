import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ApiKeyModule } from '../modules/api-key/api-key.module';
import { MigrationApiKeySeed } from './seeds/migration.api-key.seed';
import { CommonModule } from '../common/common.module';
import { UserModule } from '../modules/user/user.module';
import { AuthModule } from '../modules/auth/auth.module';
import { MigrationRoleSeed } from './seeds/migration.role.seed';
import { RBACModule } from '../modules/rbac/rbac.module';

@Module({
    imports: [
        CommandModule,
        ApiKeyModule,
        CommonModule,
        UserModule,
        AuthModule,
        RBACModule,
    ],
    providers: [MigrationApiKeySeed, MigrationRoleSeed],
    exports: [],
})
export class MigrationModule {}
