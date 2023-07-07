import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            'roles',
            [context.getHandler(), context.getClass()]
        );

        if (!requiredRoles) {
            // No roles required, access granted
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
