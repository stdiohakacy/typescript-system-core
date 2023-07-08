import { Column, Entity, OneToMany } from 'typeorm';
import { UseDTO } from '../../../common/base/decorators/use-dto.decorator';
import {
    BaseEntity,
    IBaseEntity,
} from '../../../common/base/entity/base.entity';

import { UserRoleEntity } from './user-role.entity';
import { RolePermissionEntity } from './role-permissions.entity';
import { RoleDTO } from '../../../common/authorization/rbac/dtos/role.dto';

export interface IRoleEntity extends IBaseEntity<RoleDTO> {
    name: string;
}

@Entity({ name: 'roles' })
@UseDTO(RoleDTO)
export class RoleEntity extends BaseEntity<RoleDTO> implements IRoleEntity {
    @Column({ name: 'name', unique: true })
    name: string;

    /* Relationships */

    @OneToMany(() => UserRoleEntity, (userRoles) => userRoles.role)
    userRoles?: UserRoleEntity[];

    @OneToMany(
        () => RolePermissionEntity,
        (rolePermissions) => rolePermissions.role
    )
    rolePermissions?: RolePermissionEntity[];
}
