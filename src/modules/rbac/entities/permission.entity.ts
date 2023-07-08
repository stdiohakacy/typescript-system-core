import { Column, Entity, OneToMany } from 'typeorm';
import { UseDTO } from '../../../common/base/decorators/use-dto.decorator';
import {
    BaseEntity,
    IBaseEntity,
} from '../../../common/base/entity/base.entity';
import { RolePermissionEntity } from './role-permissions.entity';
import { PermissionDTO } from '../../../common/authorization/rbac/dtos/permission.dto';

export interface IPermissionEntity extends IBaseEntity<PermissionDTO> {
    name: string;
}

@Entity({ name: 'permissions' })
@UseDTO(PermissionDTO)
export class PermissionEntity
    extends BaseEntity<PermissionDTO>
    implements IPermissionEntity
{
    @Column({ name: 'name', unique: true })
    name: string;

    /* Relationships */

    @OneToMany(
        () => RolePermissionEntity,
        (rolePermissions) => rolePermissions.permission
    )
    rolePermissions: RolePermissionEntity[];
}
