import { PickType } from '@nestjs/swagger';
import { UserDTO } from './user.dto';

export class UserRegisterDTO extends PickType(UserDTO, [
    'email',
    'username',
    'password',
    'firstName',
    'lastName',
    'phone',
]) {}
