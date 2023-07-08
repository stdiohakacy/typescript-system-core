import { UseDTO } from '../../../common/base/decorators/use-dto.decorator';
import {
    BaseEntity,
    IBaseEntity,
} from '../../../common/base/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserRoleDTO } from '../dtos/user-role.dto';
import { UserEntity } from './user.entity';
import { RoleEntity } from '../../../modules/role/entities/role.entity';

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

    @ManyToOne(() => UserEntity, (user) => user.userRoles, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @ManyToOne(() => RoleEntity, (role) => role.userRoles, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'roleId' })
    role: RoleEntity;
}
