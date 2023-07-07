import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { faker } from '@faker-js/faker';
import { BaseDTO } from '../../../common/base/dto/base.dto';
import { RoleEntity } from '../entities/role.entity';

export class RoleDTO extends BaseDTO {
    @ApiProperty({
        example: 'user',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    name: string;

    constructor(role: RoleEntity) {
        super(role);
        this.name = role.name;
    }
}
