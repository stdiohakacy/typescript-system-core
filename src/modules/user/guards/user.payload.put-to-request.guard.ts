import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserPayloadPutToRequestGuard implements CanActivate {
    constructor(private readonly userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context
            .switchToHttp()
            .getRequest<IRequestApp & { __user: UserEntity }>();
        const { user } = request;
        const userEntity = await this.userService.findOneById(user.id);
        request.__user = userEntity;

        return true;
    }
}
