import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { UserRoleEntity } from './entities/user-role.entity';
import { PermissionEntity } from './entities/permission.entity';
import { RolePermissionEntity } from './entities/role-permissions.entity';
import { RBACRoleService } from '../../common/authorization/rbac/services/rbac.role.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RoleEntity,
            UserRoleEntity,
            PermissionEntity,
            RolePermissionEntity,
        ]),
    ],
    exports: [RBACRoleService],
    providers: [RBACRoleService],
    controllers: [],
})
export class RBACModule {}
