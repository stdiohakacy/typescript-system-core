import {
    ExecutionContext,
    UseGuards,
    applyDecorators,
    createParamDecorator,
} from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { IRequestApp } from '../../../common/request/interfaces/request.interface';
import { UserPayloadPutToRequestGuard } from '../guards/user.payload.put-to-request.guard';
import { UserNotFoundGuard } from '../guards/user.not-found.guard';
import { instanceToPlain } from 'class-transformer';

export const GetUser = createParamDecorator(
    (returnPlain: boolean, ctx: ExecutionContext) => {
        const { __user } = ctx
            .switchToHttp()
            .getRequest<IRequestApp & { __user: UserEntity }>();
        return returnPlain ? instanceToPlain(__user) : __user;
    }
);
export function UserProtected(): MethodDecorator {
    return applyDecorators(
        UseGuards(UserPayloadPutToRequestGuard, UserNotFoundGuard)
    );
}
