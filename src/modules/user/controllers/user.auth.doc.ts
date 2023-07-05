import { applyDecorators } from '@nestjs/common';
import {
    Doc,
    DocAuth,
    DocResponse,
} from '../../../common/doc/decorators/doc.decorator';
import { UserProfileSerialization } from '../serializations/user.profile.serialization';

export function UserAuthProfileDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ operation: 'modules.auth.user' }),
        DocAuth({ jwtAccessToken: true }),
        DocResponse<UserProfileSerialization>('user.profile', {
            serialization: UserProfileSerialization,
        })
    );
}
