import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../entity/base.entity';
import { Uuid } from '../../../types';

export class BaseDTO {
    @ApiProperty()
    id: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    deletedAt: Date;

    @ApiProperty()
    createdBy: Uuid;

    @ApiProperty()
    updatedBy: Uuid;

    @ApiProperty()
    deletedBy: Uuid;

    constructor(entity: BaseEntity, options?: { excludeFields?: boolean }) {
        if (!options?.excludeFields) {
            this.id = entity.id;
            this.createdAt = entity.createdAt;
            this.updatedAt = entity.updatedAt;
            this.deletedAt = entity.deletedAt;
        }
    }
}
