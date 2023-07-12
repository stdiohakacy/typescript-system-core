import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserService } from '../services/user.service';
import { PaginationListDTO } from 'src/common/pagination/postgres/dtos/postgres.pagination.list.dto';
import { PaginationService } from 'src/common/pagination/postgres/services/postgres.pagination.service';

export class UserListQuery implements IQuery {
    constructor(
        public readonly find: Record<string, any>,
        public readonly pagination: PaginationListDTO
    ) {}
}

@QueryHandler(UserListQuery)
export class UserListHandler implements IQueryHandler<UserListQuery> {
    constructor(
        private readonly userService: UserService,
        private readonly paginationService: PaginationService
    ) {}

    async execute({ find, pagination }: UserListQuery) {
        const { _limit } = pagination;
        const [users, total] = await this.userService.findAllAndCount(
            find,
            pagination
        );

        const totalPage: number = this.paginationService.totalPage(
            total,
            _limit
        );

        return {
            _pagination: { total, totalPage },
            data: users,
        };
    }
}
