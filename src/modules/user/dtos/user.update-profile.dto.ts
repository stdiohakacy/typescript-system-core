import { OmitType, PickType } from '@nestjs/swagger';
import { UserDTO } from './user.dto';

export class UserUpdateProfileDTO extends PickType(UserDTO, [
    'firstName',
    'lastName',
    'email',
]) {}
