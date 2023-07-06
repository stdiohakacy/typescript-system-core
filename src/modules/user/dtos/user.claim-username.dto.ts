import { PickType } from '@nestjs/swagger';
import { UserDTO } from './user.dto';

export class UserClaimUsernameDTO extends PickType(UserDTO, ['username']) {}
