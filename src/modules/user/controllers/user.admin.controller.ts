import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
    Response,
    ResponsePaging,
} from '../../../common/response/decorators/response.decorator';
import {
    IResponse,
    IResponsePaging,
} from '../../../common/response/interfaces/response.interface';
import { UserListSerialization } from '../../../modules/user/serializations/user.list.serialization';
import {
    UserAdminCreateDoc,
    UserAdminGetDoc,
    UserAdminListDoc,
    UserAdminUpdateDoc,
} from '../docs/user.admin.doc';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
    USER_DEFAULT_AVAILABLE_ORDER_BY,
    USER_DEFAULT_AVAILABLE_SEARCH,
    USER_DEFAULT_BLOCKED,
    USER_DEFAULT_INACTIVE_PERMANENT,
    USER_DEFAULT_ORDER_BY,
    USER_DEFAULT_ORDER_DIRECTION,
    USER_DEFAULT_PER_PAGE,
    USER_DEFAULT_STATUS,
} from '../constants/user.list.constant';
import { UserListQuery } from '../queries/user.list.query';
import { ENUM_USER_STATUS } from '../constants/user.enum.constant';
import {
    PaginationQuery,
    PaginationQueryFilterInBoolean,
    PaginationQueryFilterInEnum,
} from '../../../common/pagination/postgres/decorators/postgres.pagination.decorator';
import { PaginationListDTO } from '../../../common/pagination/postgres/dtos/postgres.pagination.list.dto';
import {
    AuthJwtAccessProtected,
    AuthJwtRBACAccessProtected,
} from '../../../common/authentication/decorators/auth.jwt-decorator';
import { UserGetSerialization } from '../serializations/user.get.serialization';
import { RequestParamGuard } from '../../../common/request/decorators/request.decorator';
import { UserGetQuery } from '../queries/user.get.query';
import { UserRequestDTO } from '../dtos/user.request.dto';
import {
    UserAdminGetGuard,
    UserAdminUpdateGuard,
} from '../decorators/user.admin.decorator';
import { ResponseIdSerialization } from '../../../common/response/serializations/response.id.serialization';
import {
    ENUM_RBAC_PERMISSION_TYPE,
    ENUM_RBAC_ROLE_TYPE,
} from '../../../common/authorization/rbac/constants/rbac.enum.role.constant';
import { UserCreateDTO } from '../dtos/user.create.dto';
import { UserCreateCommand } from '../commands/user.create.command';
import { GetUser, UserProtected } from '../decorators/user.decorator';
import { UserEntity } from '../entities/user.entity';
import { UserUpdateNameDTO } from '../dtos/user.update-name.dto';
import { UserUpdateNameCommand } from '../commands/user.update-name.command';

@ApiTags('modules.admin.user')
@Controller({
    version: '1',
    path: '/user',
})
export class UserAdminController {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus
    ) {}

    @UserAdminListDoc()
    @ResponsePaging('user.list', { serialization: UserListSerialization })
    @AuthJwtRBACAccessProtected({
        roles: [ENUM_RBAC_ROLE_TYPE.ADMIN],
        permissions: [ENUM_RBAC_PERMISSION_TYPE.USER_LIST],
    })
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
        status: Record<string, any>,
        @PaginationQueryFilterInBoolean('blocked', USER_DEFAULT_BLOCKED)
        blocked: Record<string, any>,
        @PaginationQueryFilterInBoolean(
            'inactivePermanent',
            USER_DEFAULT_INACTIVE_PERMANENT
        )
        inactivePermanent: Record<string, any>
    ): Promise<IResponsePaging> {
        const find = {
            ..._search,
            ...status,
            ...blocked,
            ...inactivePermanent,
        };
        const pagination = {
            _limit,
            _offset,
            _order,
        } as PaginationListDTO;
        return await this.queryBus.execute(new UserListQuery(find, pagination));
    }

    @UserAdminGetDoc()
    @Response('user.get', { serialization: UserGetSerialization })
    @UserAdminGetGuard()
    @AuthJwtRBACAccessProtected({
        roles: [ENUM_RBAC_ROLE_TYPE.ADMIN],
        permissions: [ENUM_RBAC_PERMISSION_TYPE.USER_GET],
    })
    @RequestParamGuard(UserRequestDTO)
    @Get('/get/:id')
    async get(@Param('id') id: string): Promise<IResponse> {
        return await this.queryBus.execute(new UserGetQuery(id));
    }

    @UserAdminCreateDoc()
    @Response('user.create', { serialization: ResponseIdSerialization })
    @AuthJwtRBACAccessProtected({
        roles: [ENUM_RBAC_ROLE_TYPE.ADMIN],
        permissions: [ENUM_RBAC_PERMISSION_TYPE.USER_CREATE],
    })
    @Post('/')
    async create(
        @Body()
        payload: UserCreateDTO
    ): Promise<IResponse> {
        return await this.commandBus.execute(new UserCreateCommand(payload));
    }

    @UserAdminUpdateDoc()
    @Response('user.update', { serialization: ResponseIdSerialization })
    @UserProtected()
    @AuthJwtAccessProtected()
    // @UserAdminUpdateGuard()
    // @AuthJwtRBACAccessProtected({
    //     roles: [ENUM_RBAC_ROLE_TYPE.ADMIN],
    //     permissions: [ENUM_RBAC_PERMISSION_TYPE.USER_UPDATE],
    // })
    @RequestParamGuard(UserRequestDTO)
    @Put('/:id')
    async update(
        @Param('id') id: string,
        @GetUser() userAuth: UserEntity,
        @Body() payload: UserUpdateNameDTO
    ): Promise<IResponse> {
        return await this.commandBus.execute(
            new UserUpdateNameCommand(id, payload, userAuth)
        );
    }
}
