import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from '../../../common/response/decorators/response.decorator';
import {
    UserPublicLoginDoc,
    UserPublicRegisterDoc,
} from '../docs/user.public.doc';
import { UserRegisterDTO } from '../dtos/user.register.dto';
import { CommandBus } from '@nestjs/cqrs';
import { UserRegisterCommand } from '../commands/user-register.command';
import { UserLoginSerialization } from '../serializations/user.login.serialization';
import { IResponse } from '../../../common/response/interfaces/response.interface';
import { UserLoginCommand } from '../commands/user-login.command';
import { UserLoginDTO } from '../dtos/user.login.dto';

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

    @UserPublicLoginDoc()
    @Response('user.login', { serialization: UserLoginSerialization })
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(@Body() payload: UserLoginDTO): Promise<IResponse> {
        return await this.commandBus.execute(new UserLoginCommand(payload));
    }
}
