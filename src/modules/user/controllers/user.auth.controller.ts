import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserAuthProfileDoc } from './user.auth.doc';
import { Response } from '../../../common/response/decorators/response.decorator';
import { UserProfileSerialization } from '../serializations/user.profile.serialization';
import { IResponse } from '../../../common/response/interfaces/response.interface';
import { GetUser, UserProtected } from '../decorators/user.decorator';
import { UserEntity } from '../entities/user.entity';
import { AuthJwtAccessProtected } from '../../../common/auth/decorators/auth.jwt.decorator';

@ApiTags('modules.auth.user')
@Controller({ version: '1', path: '/user' })
export class UserAuthController {
    @UserAuthProfileDoc()
    @Response('user.profile', { serialization: UserProfileSerialization })
    @UserProtected()
    @AuthJwtAccessProtected()
    @Get('/profile')
    async profile(@GetUser() user: UserEntity): Promise<IResponse> {
        return { data: user };
    }
}
