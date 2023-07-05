import { PickType } from '@nestjs/swagger';
import { UserDTO } from './user.dto';

export class UserResetPasswordDTO extends PickType(UserDTO, [
    'forgotKey',
    'username',
    'password',
]) {}
