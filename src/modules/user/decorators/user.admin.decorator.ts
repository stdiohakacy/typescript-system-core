import { UseGuards, applyDecorators } from '@nestjs/common';
import { UserPutToRequestGuard } from '../guards/user.put-to-request.guard';
import { UserNotFoundGuard } from '../guards/user.not-found.guard';

export function UserAdminGetGuard(): MethodDecorator {
    return applyDecorators(UseGuards(UserPutToRequestGuard, UserNotFoundGuard));
}
