import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { BaseDTO } from '../../../../common/base/dto/base.dto';
import { RolePermissionEntity } from '../../../../modules/rbac/entities/role-permissions.entity';
import { v4 as uuidV4 } from 'uuid';

export class RolePermissionDTO extends BaseDTO {
    @ApiProperty({ example: uuidV4(), required: true })
    @IsUUID()
    @IsNotEmpty()
    @Type(() => String)
    roleId: string;

    @ApiProperty({ example: uuidV4(), required: true })
    @IsUUID()
    @IsNotEmpty()
    @Type(() => String)
    permissionId: string;

    constructor(rolePermission: RolePermissionEntity) {
        super(rolePermission);
        this.permissionId = rolePermission.permissionId;
        this.roleId = rolePermission.roleId;
    }
}
