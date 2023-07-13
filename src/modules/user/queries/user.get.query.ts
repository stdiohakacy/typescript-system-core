import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';
import { instanceToPlain } from 'class-transformer';

export class UserGetQuery implements IQuery {
    constructor(public readonly id: string) {}
}

@QueryHandler(UserGetQuery)
export class UserGetHandler implements IQueryHandler<UserGetQuery> {
    constructor(private readonly userService: UserService) {}

    async execute({ id }: UserGetQuery) {
        const data = await (await this.userService.joinWithRole())
            .where('users.id = :id', { id })
            .getOne();

        return instanceToPlain({ data });
    }
}
