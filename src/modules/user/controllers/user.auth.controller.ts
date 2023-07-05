import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from '../../../common/response/decorators/response.decorator';
import { UserProfileSerialization } from '../serializations/user.profile.serialization';
import { IResponse } from '../../../common/response/interfaces/response.interface';
import { GetUser, UserProtected } from '../decorators/user.decorator';
import { UserEntity } from '../entities/user.entity';
import {
    AuthJwtAccessProtected,
    AuthJwtPayload,
} from '../../../common/auth/decorators/auth.jwt.decorator';
import { UserChangePasswordDTO } from '../dtos/user.change-password.dto';
import { CommandBus } from '@nestjs/cqrs';
import { UserChangePasswordCommand } from '../commands/user.change-password.command';
import {
    UserAuthChangePasswordDoc,
    UserAuthInfoDoc,
    UserAuthProfileDoc,
} from '../dtos/user.auth.doc';
import { UserPayloadSerialization } from '../serializations/user.payload.serialization';

@ApiTags('modules.auth.user')
@Controller({ version: '1', path: '/user' })
export class UserAuthController {
    constructor(private readonly commandBus: CommandBus) {}

    @UserAuthProfileDoc()
    @Response('user.profile', { serialization: UserProfileSerialization })
    @UserProtected()
    @AuthJwtAccessProtected()
    @Get('/profile')
    async profile(@GetUser() user: UserEntity): Promise<IResponse> {
        return { data: user };
    }

    @UserAuthInfoDoc()
    @Response('user.info', { serialization: UserPayloadSerialization })
    @AuthJwtAccessProtected()
    @Get('/info')
    async info(
        @AuthJwtPayload() payload: UserPayloadSerialization
    ): Promise<IResponse> {
        return { data: payload };
    }

    @UserAuthChangePasswordDoc()
    @Response('user.changePassword')
    @UserProtected()
    @AuthJwtAccessProtected()
    @Patch('/change-password')
    async changePassword(
        @GetUser() userAuth: UserEntity,
        @Body() body: UserChangePasswordDTO
    ) {
        return await this.commandBus.execute(
            new UserChangePasswordCommand(userAuth, body)
        );
    }
}
