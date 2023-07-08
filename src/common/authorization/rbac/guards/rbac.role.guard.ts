import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RBAC_ROLE_TYPE_KEY } from '../constants/rbac.constant';
import { UserService } from '../../../../modules/user/services/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly userService: UserService
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            RBAC_ROLE_TYPE_KEY,
            [context.getHandler(), context.getClass()]
        );

        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        const userRoles = user.roles;

        // Check if the user has at least one of the required roles
        const hasRequiredRole = userRoles.some((role) =>
            requiredRoles.includes(role.name)
        );

        return hasRequiredRole;
    }
}
