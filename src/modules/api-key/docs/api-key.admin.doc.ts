import { HttpStatus, applyDecorators } from '@nestjs/common';
import { Doc } from '../../../common/doc/decorators/doc.decorator';
import { ApiKeyCreateSerialization } from '../serializations/api-key.create.serialization';

export function ApiKeyAdminCreateDoc(): MethodDecorator {
    return applyDecorators(
        Doc<ApiKeyCreateSerialization>('apiKey.create', {
            auth: {
                jwtAccessToken: true,
            },
            response: {
                httpStatus: HttpStatus.CREATED,
                serialization: ApiKeyCreateSerialization,
            },
        })
    );
}
