import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from '../../../modules/rbac/entities/permission.entity';
import { RolePermissionEntity } from '../../../modules/rbac/entities/role-permissions.entity';
import { RoleEntity } from '../../../modules/rbac/entities/role.entity';
import { UserRoleEntity } from '../../../modules/rbac/entities/user-role.entity';
import { RBACRoleService } from './services/rbac.role.service';
import { RBACPermissionService } from './services/rbac.permission.service';
import { RBACUserRoleService } from './services/rbac.user-role.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RoleEntity,
            UserRoleEntity,
            PermissionEntity,
            RolePermissionEntity,
        ]),
    ],
    exports: [RBACRoleService, RBACPermissionService, RBACUserRoleService],
    providers: [RBACRoleService, RBACPermissionService, RBACUserRoleService],
    controllers: [],
})
export class RBACCommonModule {}
