import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RBAC_ROLE_TYPE_KEY } from '../constants/rbac.constant';
import { UserService } from '../../../../modules/user/services/user.service';
import { ENUM_ROLE_TYPE } from 'src/modules/role/constants/role.enum.constant';

@Injectable()
export class RBACRolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly userService: UserService
    ) {}

    async canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            RBAC_ROLE_TYPE_KEY,
            [context.getHandler(), context.getClass()]
        );

        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
        const userWithRoles = await this.userService.joinWithRole(user);
        const userRoles = userWithRoles.userRoles.map(
            (userRole) => userRole.role.name
        );

        if (userRoles[0] === ENUM_ROLE_TYPE.SUPER_ADMIN) {
            return true;
        }

        const hasRequiredRole = requiredRoles.every((element) =>
            userRoles.includes(element)
        );

        return hasRequiredRole;
    }
}
