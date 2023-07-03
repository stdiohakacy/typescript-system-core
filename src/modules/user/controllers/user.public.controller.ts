import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from '../../../common/response/decorators/response.decorator';
import { UserPublicRegisterDoc } from '../docs/user.public.doc';
import { UserRegisterDTO } from '../dtos/user.register.dto';
import { CommandBus } from '@nestjs/cqrs';
import { UserRegisterCommand } from '../commands/user-register.comand';

@ApiTags('modules.public.user')
@Controller({
    version: '1',
    path: '/user',
})
export class UserPublicController {
    constructor(private readonly commandBus: CommandBus) {}

    @UserPublicRegisterDoc()
    @Response('user.register')
    @Post('/register')
    async register(@Body() payload: UserRegisterDTO) {
        return await this.commandBus.execute(new UserRegisterCommand(payload));
    }
}
