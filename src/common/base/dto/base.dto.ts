import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../entity/base.entity';
import { Uuid } from '../../../types';

export class BaseDTO {
    @ApiProperty()
    id: Uuid;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    constructor(entity: BaseEntity, options?: { excludeFields?: boolean }) {
        if (!options?.excludeFields) {
            this.id = entity.id;
            this.createdAt = entity.createdAt;
            this.updatedAt = entity.updatedAt;
        }
    }
}
