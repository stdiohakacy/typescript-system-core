import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ApiKeyModule } from '../modules/api-key/api-key.module';
import { MigrationApiKeySeed } from './seeds/migration.api-key.seed';
import { CommonModule } from '../common/common.module';

@Module({
    imports: [CommandModule, ApiKeyModule, CommonModule],
    providers: [MigrationApiKeySeed],
    exports: [],
})
export class MigrationModule {}
