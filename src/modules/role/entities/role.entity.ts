import { Column, Entity } from 'typeorm';
import {
    BaseEntity,
    IBaseEntity,
} from '../../../common/base/entity/base.entity';
import { UseDTO } from '../../../common/base/decorators/use-dto.decorator';
import { RoleDTO } from '../dtos/role.dto';

export interface IRoleEntity extends IBaseEntity<RoleDTO> {
    name: string;
}

@Entity({ name: 'roles' })
@UseDTO(RoleDTO)
export class RoleEntity extends BaseEntity<RoleDTO> implements IRoleEntity {
    @Column({ name: 'name', unique: true })
    name: string;
}
