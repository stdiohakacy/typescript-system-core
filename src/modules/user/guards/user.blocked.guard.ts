import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { UserEntity } from '../entities/user.entity';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';
import { USER_BLOCKED_META_KEY } from '../constants/user.constant';

@Injectable()
export class UserBlockedGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const required: boolean[] = this.reflector.getAllAndOverride<boolean[]>(
            USER_BLOCKED_META_KEY,
            [context.getHandler(), context.getClass()]
        );

        if (!required) {
            return true;
        }

        const { __user } = context
            .switchToHttp()
            .getRequest<IRequestApp & { __user: UserEntity }>();

        if (!required.includes(__user.blocked)) {
            throw new BadRequestException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_BLOCKED_ERROR,
                message: 'user.error.blocked',
            });
        }
        return true;
    }
}
