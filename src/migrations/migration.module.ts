import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ApiKeyModule } from '../modules/api-key/api-key.module';
import { MigrationApiKeySeed } from './seeds/migration.api-key.seed';
import { CommonModule } from '../common/common.module';
import { MigrationRoleSeed } from './seeds/migration.role.seed';
import { RoleModule } from '../modules/role/role.module';
import { MigrationUserSeed } from './seeds/migration.user.seed';
import { UserModule } from '../modules/user/user.module';
import { AuthModule } from '../modules/auth/auth.module';

@Module({
    imports: [
        CommandModule,
        ApiKeyModule,
        CommonModule,
        RoleModule,
        UserModule,
        AuthModule,
    ],
    providers: [MigrationApiKeySeed, MigrationRoleSeed, MigrationUserSeed],
    exports: [],
})
export class MigrationModule {}
