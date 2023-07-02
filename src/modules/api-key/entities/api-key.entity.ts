import {
    BaseEntity,
    IBaseEntity,
} from '../../../common/base/entity/base.entity';
import { ENUM_API_KEY_TYPE } from '../constant/api-key.enum.constant';
import { ApiKeyDTO } from '../dtos/api-key.dto';
import { Column, Entity } from 'typeorm';
import { UseDTO } from '../../../common/base/decorators/use-dto.decorator';

export interface IApiKeyEntity extends IBaseEntity<ApiKeyDTO> {
    type: ENUM_API_KEY_TYPE;
    name: string;
    key: string;
    hash: string;
    isActive: boolean;
    startDate?: Date;
    endDate?: Date;
}

@Entity({ name: 'api-keys' })
@UseDTO(ApiKeyDTO)
export class ApiKeyEntity
    extends BaseEntity<ApiKeyDTO>
    implements IApiKeyEntity
{
    @Column({ name: 'type', enum: ENUM_API_KEY_TYPE })
    type: ENUM_API_KEY_TYPE;

    @Column({ name: 'name', type: 'text' })
    name: string;

    @Column({ name: 'key', type: 'text' })
    key: string;

    @Column({ name: 'hash', type: 'text' })
    hash: string;

    @Column({ name: 'isActive', type: 'boolean' })
    isActive: boolean;

    @Column({ name: 'startDate', type: 'timestamptz', nullable: true })
    startDate?: Date;

    @Column({ name: 'endDate', type: 'timestamptz', nullable: true })
    endDate?: Date;
}
