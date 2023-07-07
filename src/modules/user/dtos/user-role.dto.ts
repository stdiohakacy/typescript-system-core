import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from '../../../common/base/dto/base.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { faker } from '@faker-js/faker';

export class UserRoleDTO extends BaseDTO {
    @ApiProperty({
        example: faker.datatype.uuid(),
        required: true,
    })
    @IsUUID()
    @IsNotEmpty()
    @Type(() => String)
    userId: string;

    @ApiProperty({
        example: faker.datatype.uuid(),
        required: true,
    })
    @IsUUID()
    @IsNotEmpty()
    @Type(() => String)
    roleId: string;
}
