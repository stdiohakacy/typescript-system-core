import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDTO } from '../../../../common/base/dto/base.dto';
import { ENUM_RBAC_PERMISSION_TYPE } from '../constants/rbac.enum.permission.constant';
import { PermissionEntity } from '../../../../modules/rbac/entities/permission.entity';

export class PermissionDTO extends BaseDTO {
    @ApiProperty({
        example: ENUM_RBAC_PERMISSION_TYPE.USER_DELETE,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    name: string;

    constructor(permission: PermissionEntity) {
        super(permission);
        this.name = permission.name;
    }
}
