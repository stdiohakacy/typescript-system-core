import { PickType } from '@nestjs/swagger';
import { UserRoleDTO } from '../../../../modules/user/dtos/user-role.dto';

export class UserRoleCreateDTO extends PickType(UserRoleDTO, [
    'userId',
    'roleId',
]) {}
