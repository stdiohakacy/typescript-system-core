import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ApiKeyModule } from '../modules/api-key/api-key.module';
import { MigrationApiKeySeed } from './seeds/migration.api-key.seed';
import { CommonModule } from '../common/common.module';
import { UserModule } from '../modules/user/user.module';
import { AuthModule } from '../modules/auth/auth.module';
import { MigrationRoleSeed } from './seeds/migration.role.seed';
import { RBACCommonModule } from '../common/authorization/rbac/rbac.module';
import { MigrationUserRoleSeed } from './seeds/migration.user-role.seed';
import { MigrationUserSeed } from './seeds/migration.user.seed';
import { MigrationPermissionSeed } from './seeds/migration.permission.seed';

@Module({
    imports: [
        CommandModule,
        ApiKeyModule,
        CommonModule,
        UserModule,
        AuthModule,
        RBACCommonModule,
    ],
    providers: [
        MigrationApiKeySeed,
        MigrationRoleSeed,
        MigrationUserRoleSeed,
        MigrationUserSeed,
        MigrationPermissionSeed,
    ],
    exports: [],
})
export class MigrationModule {}
