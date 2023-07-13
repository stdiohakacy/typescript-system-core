import { PickType } from '@nestjs/swagger';
import { UserDTO } from './user.dto';

export class UserCreateDTO extends PickType(UserDTO, [
    'email',
    'username',
    'firstName',
    'lastName',
    'phone',
    'roleId',
    'password',
    'signUpFrom',
]) {}
