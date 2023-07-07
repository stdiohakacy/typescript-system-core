import { UseDTO } from '../../../common/base/decorators/use-dto.decorator';
import {
    BaseEntity,
    IBaseEntity,
} from '../../../common/base/entity/base.entity';
import { Column, Entity } from 'typeorm';
import { UserRoleDTO } from '../dtos/user-role.dto';

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
}
