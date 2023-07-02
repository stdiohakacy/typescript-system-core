import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from '../../../common/response/decorators/response.decorator';
import { UserPublicRegisterDoc } from '../docs/user.public.doc';
import { UserRegisterDTO } from '../dtos/user.register.dto';

@ApiTags('modules.public.user')
@Controller({
    version: '1',
    path: '/user',
})
export class UserPublicController {
    @UserPublicRegisterDoc()
    @Response('user.register')
    @Post('/register')
    async register(
        @Body()
        payload: UserRegisterDTO
    ): Promise<void> {}
}
