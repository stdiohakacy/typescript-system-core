import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponsePaging } from 'src/common/response/decorators/response.decorator';
import { IResponsePaging } from 'src/common/response/interfaces/response.interface';
import { UserListSerialization } from 'src/modules/user/serializations/user.list.serialization';
import { UserAdminListDoc } from '../docs/user.admin.doc';
import { QueryBus } from '@nestjs/cqrs';
import {
    USER_DEFAULT_AVAILABLE_ORDER_BY,
    USER_DEFAULT_AVAILABLE_SEARCH,
    USER_DEFAULT_BLOCKED,
    USER_DEFAULT_INACTIVE_PERMANENT,
    USER_DEFAULT_IS_ACTIVE,
    USER_DEFAULT_ORDER_BY,
    USER_DEFAULT_ORDER_DIRECTION,
    USER_DEFAULT_PER_PAGE,
    USER_DEFAULT_STATUS,
} from '../constants/user.list.constant';
import { UserListQuery } from '../queries/user.list.query';
import { ENUM_USER_STATUS } from '../constants/user.enum.constant';
import {
    PaginationQuery,
    PaginationQueryFilterInEnum,
} from '../../../common/pagination/postgres/decorators/postgres.pagination.decorator';
import { PaginationListDTO } from '../../../common/pagination/postgres/dtos/postgres.pagination.list.dto';

@ApiTags('modules.admin.user')
@Controller({
    version: '1',
    path: '/user',
})
export class UserAdminController {
    constructor(private readonly queryBus: QueryBus) {}

    @UserAdminListDoc()
    @ResponsePaging('user.list', { serialization: UserListSerialization })
    // @AuthJwtAdminAccessProtected()
    @Get('/')
    async list(
        @PaginationQuery(
            USER_DEFAULT_PER_PAGE,
            USER_DEFAULT_ORDER_BY,
            USER_DEFAULT_ORDER_DIRECTION,
            USER_DEFAULT_AVAILABLE_SEARCH,
            USER_DEFAULT_AVAILABLE_ORDER_BY
        )
        { _search, _limit, _offset, _order }: PaginationListDTO,
        @PaginationQueryFilterInEnum(
            'status',
            USER_DEFAULT_STATUS,
            ENUM_USER_STATUS
        )
        status: Record<string, any>
    ): Promise<IResponsePaging> {
        const find = { ..._search, ...status };
        const pagination = {
            _limit,
            _offset,
            _order,
        } as PaginationListDTO;
        return await this.queryBus.execute(new UserListQuery(find, pagination));
    }
}
