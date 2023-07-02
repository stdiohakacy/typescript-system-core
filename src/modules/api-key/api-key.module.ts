import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKeyEntity } from './entities/api-key.entity';
import { ApiKeyService } from './services/api-key.service';
import { ApiKeyXApiKeyStrategy } from './guards/x-api-key/api-key.x-api-key.strategy';

@Module({
    imports: [TypeOrmModule.forFeature([ApiKeyEntity])],
    providers: [ApiKeyService, ApiKeyXApiKeyStrategy],
    exports: [ApiKeyService],
})
export class ApiKeyModule {}
