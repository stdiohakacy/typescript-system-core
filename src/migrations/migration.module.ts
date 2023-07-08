import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ApiKeyModule } from '../modules/api-key/api-key.module';
import { MigrationApiKeySeed } from './seeds/migration.api-key.seed';
import { CommonModule } from '../common/common.module';
import { UserModule } from '../modules/user/user.module';
import { AuthModule } from '../modules/auth/auth.module';

@Module({
    imports: [
        CommandModule,
        ApiKeyModule,
        CommonModule,
        UserModule,
        AuthModule,
    ],
    providers: [MigrationApiKeySeed],
    exports: [],
})
export class MigrationModule {}
