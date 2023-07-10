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

export function AuthJwtAccessProtected(): MethodDecorator {
    return applyDecorators(UseGuards(AuthJwtAccessGuard));
}

export function AuthJwtUserAccessProtected(): MethodDecorator {
    return applyDecorators(
        UseGuards(AuthJwtAccessGuard, RBACRolePermissionTypeAccessGuard),
        SetMetadata(RBAC_ROLE_TYPE_META_KEY, [ENUM_RBAC_ROLE_TYPE.USER]),
        SetMetadata(RBAC_PERMISSION_TYPE_META_KEY, [
            ENUM_RBAC_PERMISSION_TYPE.USER_DELETE,
        ])
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
