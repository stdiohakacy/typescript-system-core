import { Controller, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { UserUserSelfDeleteDoc } from '../docs/user.user.doc';
import { Response } from '../../../common/response/decorators/response.decorator';
import { GetUser, UserProtected } from '../decorators/user.decorator';
import { UserEntity } from '../entities/user.entity';
import { UserSelfDeleteCommand } from '../commands/user.self-delete.command';

@ApiTags('modules.user.user')
@Controller({
    version: '1',
    path: '/user',
})
export class UserUserController {
    constructor(private readonly commandBus: CommandBus) {}

    @UserUserSelfDeleteDoc()
    @Response('user.selfDelete')
    @UserProtected()
    // @AuthJwtUserAccessProtected()
    // @RequiredPermission('users:delete')
    @Delete('/delete')
    async delete(@GetUser() userAuth: UserEntity) {
        return this.commandBus.execute(new UserSelfDeleteCommand(userAuth));
    }
}
