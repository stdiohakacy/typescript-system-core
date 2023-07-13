import {
    ExecutionContext,
    SetMetadata,
    UseGuards,
    applyDecorators,
    createParamDecorator,
} from '@nestjs/common';
import { AuthJwtAccessGuard } from '../guards/jwt-access/auth.jwt-access.guard';
import { IRequestApp } from '../../../common/request/interfaces/request.interface';
import { UserPayloadSerialization } from '../../../modules/user/serializations/user.payload.serialization';
import { AuthJwtRefreshGuard } from '../guards/jwt-refresh/auth.jwt-refresh.guard';
import { RBACRolePermissionTypeAccessGuard } from '../../authorization/rbac/guards/rbac.role-permission-type.guard';
import {
    RBAC_PERMISSION_TYPE_META_KEY,
    RBAC_ROLE_TYPE_META_KEY,
} from '../../../common/authorization/rbac/constants/rbac.constant';
import {
    ENUM_RBAC_PERMISSION_TYPE,
    ENUM_RBAC_ROLE_TYPE,
} from '../../../common/authorization/rbac/constants/rbac.enum.role.constant';
import { ENUM_ACL_ROLE_TYPE } from '../../authorization/acl/constants/acl.role.enum.constant';
import {
    ENUM_ACL_PERMISSION_TYPE,
    ENUM_ACL_RESOURCE_TYPE,
} from '../../../common/authorization/acl/constants/acl.permission.enum.constant';
import { ACLRolePermissionTypeAccessGuard } from '../../../common/authorization/acl/guards/acl.role-permission-type.guard';
import {
    ACL_PERMISSION_TYPE_META_KEY,
    ACL_RESOURCE_TYPE_META_KEY,
    ACL_ROLE_TYPE_META_KEY,
} from '../../../common/authorization/acl/constants/acl.constant';

export function AuthJwtAccessProtected(): MethodDecorator {
    return applyDecorators(UseGuards(AuthJwtAccessGuard));
}

export function AuthJwtRBACUserAccessProtected(): MethodDecorator {
    return applyDecorators(
        UseGuards(AuthJwtAccessGuard, RBACRolePermissionTypeAccessGuard),
        SetMetadata(RBAC_ROLE_TYPE_META_KEY, [ENUM_RBAC_ROLE_TYPE.USER]),
        SetMetadata(RBAC_PERMISSION_TYPE_META_KEY, [
            ENUM_RBAC_PERMISSION_TYPE.USER_DELETE,
        ])
    );
}

export function AuthJwtACLUserAccessProtected(): MethodDecorator {
    return applyDecorators(
        UseGuards(AuthJwtAccessGuard, ACLRolePermissionTypeAccessGuard),
        SetMetadata(ACL_RESOURCE_TYPE_META_KEY, [ENUM_ACL_RESOURCE_TYPE.USER])
    );
}

export const AuthJwtPayload = createParamDecorator(
    (data: string, ctx: ExecutionContext): Record<string, any> => {
        const { user } = ctx
            .switchToHttp()
            .getRequest<IRequestApp & { user: UserPayloadSerialization }>();
        return data ? user[data] : user;
    }
);

export function AuthJwtRefreshProtected(): MethodDecorator {
    return applyDecorators(UseGuards(AuthJwtRefreshGuard));
}

export const AuthJwtToken = createParamDecorator(
    (data: string, ctx: ExecutionContext): string => {
        const { headers } = ctx.switchToHttp().getRequest<IRequestApp>();
        const { authorization } = headers;
        const authorizations: string[] = authorization.split(' ');

        return authorizations.length >= 2 ? authorizations[1] : undefined;
    }
);

// export function AuthJwtRBACAdminAccessProtected(): MethodDecorator {
//     return applyDecorators(
//         UseGuards(AuthJwtAccessGuard, RBACRolePermissionTypeAccessGuard),
//         SetMetadata(RBAC_ROLE_TYPE_META_KEY, [ENUM_RBAC_ROLE_TYPE.ADMIN]),
//         SetMetadata(RBAC_PERMISSION_TYPE_META_KEY, [
//             ENUM_RBAC_PERMISSION_TYPE.USER_LIST,
//         ])
//     );
// }

export function AuthJwtRBACAccessProtected(policy: {
    roles?: ENUM_RBAC_ROLE_TYPE[];
    permissions?: ENUM_RBAC_PERMISSION_TYPE[];
}): MethodDecorator {
    return applyDecorators(
        UseGuards(AuthJwtAccessGuard, RBACRolePermissionTypeAccessGuard),
        SetMetadata(RBAC_ROLE_TYPE_META_KEY, policy.roles),
        SetMetadata(RBAC_PERMISSION_TYPE_META_KEY, policy.permissions)
    );
}
