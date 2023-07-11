import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ENUM_ACL_RESOURCE_TYPE } from '../constants/acl.permission.enum.constant';
import { ACL_RESOURCE_TYPE_META_KEY, ac } from '../constants/acl.constant';
import { ENUM_ACL_ROLE_TYPE } from '../constants/acl.role.enum.constant';
import { UserService } from '../../../../modules/user/services/user.service';
import { ENUM_REQUEST_METHOD } from 'src/common/request/constants/request.enum.constant';

@Injectable()
export class ACLRolePermissionTypeAccessGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly userService: UserService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredResource = this.reflector.get<ENUM_ACL_RESOURCE_TYPE[]>(
            ACL_RESOURCE_TYPE_META_KEY,
            context.getHandler()
        );

        const request = context.switchToHttp().getRequest();
        const { user, method } = request;

        const userEntity = await (await this.userService.joinWithRole())
            .where('users.id = :id', { id: user.id })
            .getOne();

        const rolesName = userEntity.userRoles.map(
            (userRole) => userRole.role.name
        );

        if (rolesName.includes(ENUM_ACL_ROLE_TYPE.SUPER_ADMIN)) return true;

        let isPermission: boolean = false;
        switch (method) {
            case ENUM_REQUEST_METHOD.GET:
            case ENUM_REQUEST_METHOD.POST:
            case ENUM_REQUEST_METHOD.DELETE:
                isPermission = ac
                    .can(rolesName)
                    .deleteOwn(requiredResource[0]).granted;
            default:
        }

        return isPermission;
    }
}
