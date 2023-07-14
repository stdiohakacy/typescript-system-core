import { PickType } from '@nestjs/swagger';
import { UserDTO } from './user.dto';

export class UserUpdateNameDTO extends PickType(UserDTO, [
    'firstName',
    'lastName',
]) {}
