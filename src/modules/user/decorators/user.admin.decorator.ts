import { UseGuards, applyDecorators } from '@nestjs/common';
import { UserPutToRequestGuard } from '../guards/user.put-to-request.guard';
import { UserNotFoundGuard } from '../guards/user.not-found.guard';
import { UserCanNotOurSelfGuard } from '../guards/user.can-not-ourself.guard';

export function UserAdminGetGuard(): MethodDecorator {
    return applyDecorators(UseGuards(UserPutToRequestGuard, UserNotFoundGuard));
}

export function UserAdminUpdateGuard(): MethodDecorator {
    return applyDecorators(
        UseGuards(
            UserPutToRequestGuard,
            UserNotFoundGuard,
            UserCanNotOurSelfGuard
        )
    );
}
