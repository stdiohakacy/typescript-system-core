import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiKeyXApiKeyGuard } from '../guards/x-api-key/api-key.x-api-key.guard';
import { ENUM_API_KEY_TYPE } from '../constant/api-key.enum.constant';
import { ApiKeyPayloadTypeGuard } from '../guards/payload/api-key.payload.type.guard';
import { API_KEY_TYPE_META_KEY } from '../constant/api-key.constant';

export function ApiKeyPublicProtected(): MethodDecorator {
    return applyDecorators(
        UseGuards(ApiKeyXApiKeyGuard, ApiKeyPayloadTypeGuard),
        SetMetadata(API_KEY_TYPE_META_KEY, [ENUM_API_KEY_TYPE.PUBLIC])
    );
}
