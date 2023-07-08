import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDTO } from '../../../../common/base/dto/base.dto';
import { ENUM_RBAC_ROLE_TYPE } from '../constants/rbac.enum.role.constant';
import { RoleEntity } from '../../../../modules/rbac/entities/role.entity';

export class RoleDTO extends BaseDTO {
    @ApiProperty({
        example: ENUM_RBAC_ROLE_TYPE.USER,
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
