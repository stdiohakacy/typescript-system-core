import { applyDecorators } from '@nestjs/common';
import {
    Doc,
    DocAuth,
    DocGuard,
    DocRequest,
    DocResponsePaging,
} from '../../../common/doc/decorators/doc.decorator';
import { UserListSerialization } from '../serializations/user.list.serialization';
import {
    UserDocQueryBlocked,
    UserDocQueryInactivePermanent,
    UserDocQueryStatus,
} from './user.doc.constant';

export function UserAdminListDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ operation: 'modules.admin.user' }),
        DocRequest({
            queries: [
                ...UserDocQueryBlocked,
                ...UserDocQueryInactivePermanent,
                ...UserDocQueryStatus,
            ],
        }),
        DocAuth({ jwtAccessToken: true }),
        DocGuard({ role: true, policy: true }),
        DocResponsePaging<UserListSerialization>('user.list', {
            serialization: UserListSerialization,
        })
    );
}
