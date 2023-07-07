import { applyDecorators } from '@nestjs/common';
import {
    Doc,
    DocAuth,
    DocGuard,
    DocResponse,
} from 'src/common/doc/decorators/doc.decorator';

export function UserUserSelfDeleteDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ operation: 'modules.user.user' }),
        DocAuth({ jwtAccessToken: true }),
        DocGuard({ role: true }),
        DocResponse('user.selfDelete')
    );
}
