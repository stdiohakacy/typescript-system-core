import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UseDTO } from '../../../common/base/decorators/use-dto.decorator';
import {
    BaseEntity,
    IBaseEntity,
} from '../../../common/base/entity/base.entity';
import { PermissionEntity } from './permission.entity';
import { RoleEntity } from './role.entity';
import { RolePermissionDTO } from '../../../common/authorization/rbac/dtos/role-permission.dto';

export interface IRolePermissionEntity extends IBaseEntity<RolePermissionDTO> {
    roleId: string;
    permissionId: string;
}

@Entity({ name: 'role_permissions' })
@UseDTO(RolePermissionDTO)
export class RolePermissionEntity
    extends BaseEntity<RolePermissionDTO>
    implements IRolePermissionEntity
{
    @Column({ name: 'permissionId', type: 'uuid' })
    permissionId: string;

    @Column({ name: 'roleId', type: 'uuid' })
    roleId: string;

    /* Relationships */

    @ManyToOne(
        () => PermissionEntity,
        (permission) => permission.rolePermissions
    )
    @JoinColumn({ name: 'permissionId' })
    permission?: PermissionEntity;

    @ManyToOne(() => RoleEntity, (roles) => roles.rolePermissions)
    @JoinColumn({ name: 'roleId' })
    role?: RoleEntity;
}
