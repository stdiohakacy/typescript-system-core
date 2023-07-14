import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { UserPutToRequestGuard } from '../guards/user.put-to-request.guard';
import { UserNotFoundGuard } from '../guards/user.not-found.guard';
import { UserCanNotOurSelfGuard } from '../guards/user.can-not-ourself.guard';
import { UserBlockedGuard } from '../guards/user.blocked.guard';
import { UserActiveGuard } from '../guards/user.active.guard';
import {
    USER_ACTIVE_META_KEY,
    USER_BLOCKED_META_KEY,
    USER_INACTIVE_PERMANENT_META_KEY,
} from '../constants/user.constant';
import { UserInactivePermanentGuard } from '../guards/user.inactive-permanent.guard';

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

export function UserAdminUpdateInactiveGuard(): MethodDecorator {
    return applyDecorators(
        UseGuards(
            UserPutToRequestGuard,
            UserNotFoundGuard,
            UserCanNotOurSelfGuard,
            UserBlockedGuard,
            UserInactivePermanentGuard,
            UserActiveGuard
        ),
        SetMetadata(USER_INACTIVE_PERMANENT_META_KEY, [false]),
        SetMetadata(USER_ACTIVE_META_KEY, [true]),
        SetMetadata(USER_BLOCKED_META_KEY, [false])
    );
}

export function UserAdminForceActiveGuard(): MethodDecorator {
    return applyDecorators(
        UseGuards(
            UserPutToRequestGuard,
            UserNotFoundGuard,
            UserCanNotOurSelfGuard,
            UserBlockedGuard,
            UserInactivePermanentGuard,
            UserActiveGuard
        ),
        SetMetadata(USER_INACTIVE_PERMANENT_META_KEY, [false]),
        SetMetadata(USER_ACTIVE_META_KEY, [false]),
        SetMetadata(USER_BLOCKED_META_KEY, [false])
    );
}

export function UserAdminUpdateBlockedGuard(): MethodDecorator {
    return applyDecorators(
        UseGuards(
            UserPutToRequestGuard,
            UserNotFoundGuard,
            UserCanNotOurSelfGuard,
            UserBlockedGuard
        ),
        SetMetadata(USER_BLOCKED_META_KEY, [false])
    );
}

export function UserAdminForceDeleteGuard(): MethodDecorator {
    return applyDecorators(
        UseGuards(
            UserPutToRequestGuard,
            UserNotFoundGuard,
            UserCanNotOurSelfGuard
        )
    );
}
