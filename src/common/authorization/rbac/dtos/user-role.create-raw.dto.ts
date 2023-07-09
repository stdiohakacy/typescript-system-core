import { PartialType } from '@nestjs/swagger';
import { UserRoleDTO } from '../../../../modules/user/dtos/user-role.dto';

export class UserRoleCreateRawDTO extends PartialType(UserRoleDTO) {}
