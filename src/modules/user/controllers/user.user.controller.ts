import { Controller, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { UserUserSelfDeleteDoc } from '../docs/user.user.doc';
import { Response } from '../../../common/response/decorators/response.decorator';
import { AuthJwtUserAccessProtected } from '../../../modules/auth/decorators/auth.jwt-decorator';
import { UserProtected } from '../decorators/user.decorator';

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

    @UserUserSelfDeleteDoc()
    @Response('user.selfDelete')
    @UserProtected()
    @AuthJwtUserAccessProtected()
    @Delete('/protect')
    async protect() {
        console.log('pass');
    }
}
