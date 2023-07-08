import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { BaseDTO } from '../../../../common/base/dto/base.dto';
import { UserRoleEntity } from '../../../../modules/rbac/entities/user-role.entity';
import { v4 as uuidV4 } from 'uuid';

export class UserRoleDTO extends BaseDTO {
    @ApiProperty({ example: uuidV4(), required: true })
    @IsUUID()
    @IsNotEmpty()
    @Type(() => String)
    userId: string;

    @ApiProperty({ example: uuidV4(), required: true })
    @IsUUID()
    @IsNotEmpty()
    @Type(() => String)
    roleId: string;

    constructor(userRole: UserRoleEntity) {
        super(userRole);
        this.userId = userRole.userId;
        this.roleId = userRole.roleId;
    }
}
