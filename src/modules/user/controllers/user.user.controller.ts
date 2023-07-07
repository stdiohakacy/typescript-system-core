import { Controller, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { RolesGuard } from '../../../common/authorization/rbac/guards/rbac.role.guard';
import { Roles } from '../../../common/authorization/rbac/decorators/rbac.roles.decorator';

@ApiTags('modules.user.user')
@Controller({
    version: '1',
    path: '/user',
})
export class UserUserController {
    constructor(private readonly commandBus: CommandBus) {}

    // @UserUserSelfDeleteDoc()
    // @Response('user.selfDelete')
    // @UserProtected()
    // @AuthJwtAccessProtected()
    // @RBACAuthJwtUserAccessProtected()
    // @Delete('/delete')
    // async selfDelete(@GetUser() userAuth: UserEntity) {
    //     return this.commandBus.execute(new UserSelfDeleteCommand(userAuth));
    // }

    @Roles('user')
    @UseGuards(RolesGuard)
    @Delete('/protect')
    async protect() {
        console.log('pass');
    }
}
