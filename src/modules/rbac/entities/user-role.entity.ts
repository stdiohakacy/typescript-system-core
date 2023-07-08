import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UseDTO } from '../../../common/base/decorators/use-dto.decorator';
import {
    BaseEntity,
    IBaseEntity,
} from '../../../common/base/entity/base.entity';
import { UserEntity } from '../../../modules/user/entities/user.entity';
import { RoleEntity } from './role.entity';
import { UserRoleDTO } from '../../../modules/user/dtos/user-role.dto';

export interface IUserRoleEntity extends IBaseEntity<UserRoleDTO> {
    userId: string;
    roleId: string;
}

@Entity({ name: 'user_roles' })
@UseDTO(UserRoleDTO)
export class UserRoleEntity
    extends BaseEntity<UserRoleDTO>
    implements IUserRoleEntity
{
    @Column({ name: 'userId', type: 'uuid' })
    userId: string;

    @Column({ name: 'roleId', type: 'uuid' })
    roleId: string;

    /* Relationships */

    @ManyToOne(() => UserEntity, (user) => user.userRoles)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @ManyToOne(() => RoleEntity, (roles) => roles.userRoles)
    @JoinColumn({ name: 'roleId' })
    role: RoleEntity;
}
