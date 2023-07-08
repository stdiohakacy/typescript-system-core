import { Column, Entity, OneToMany } from 'typeorm';
import {
    BaseEntity,
    IBaseEntity,
} from '../../../common/base/entity/base.entity';
import { UseDTO } from '../../../common/base/decorators/use-dto.decorator';
import { RoleDTO } from '../dtos/role.dto';
import { UserRoleEntity } from '../../../modules/user/entities/user-role.entity';

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
}
