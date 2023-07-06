import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Patch,
    Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from '../../../common/response/decorators/response.decorator';
import { UserProfileSerialization } from '../serializations/user.profile.serialization';
import { IResponse } from '../../../common/response/interfaces/response.interface';
import {
    GetUser,
    UserAuthProtected,
    UserProtected,
} from '../decorators/user.decorator';
import { UserEntity } from '../entities/user.entity';
import { UserChangePasswordDTO } from '../dtos/user.change-password.dto';
import { CommandBus } from '@nestjs/cqrs';
import { UserChangePasswordCommand } from '../commands/user.change-password.command';
import {
    UserAuthChangePasswordDoc,
    UserAuthInfoDoc,
    UserAuthProfileDoc,
    UserAuthRefreshDoc,
    UserAuthUpdateProfileDoc,
} from '../dtos/user.auth.doc';
import { UserPayloadSerialization } from '../serializations/user.payload.serialization';
import { UserRefreshSerialization } from '../serializations/user.refresh-serialization';
import {
    AuthJwtAccessProtected,
    AuthJwtPayload,
    AuthJwtRefreshProtected,
    AuthJwtToken,
} from '../../../modules/auth/decorators/auth.jwt-decorator';
import { UserRefreshTokenCommand } from '../commands/user.refresh-token.command';
import { UserUpdateProfileDTO } from '../dtos/user.update-profile.dto';
import { UserUpdateProfileCommand } from '../commands/user.update-profile.command';

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

    @UserAuthRefreshDoc()
    @Response('user.refresh', { serialization: UserRefreshSerialization })
    @UserAuthProtected()
    @UserProtected()
    @AuthJwtRefreshProtected()
    @HttpCode(HttpStatus.OK)
    @Post('/refresh')
    async refresh(
        @AuthJwtToken() refreshToken: string,
        @GetUser() userAuth: UserEntity
    ): Promise<IResponse> {
        return await this.commandBus.execute(
            new UserRefreshTokenCommand(userAuth, refreshToken)
        );
    }

    @UserAuthUpdateProfileDoc()
    @Response('user.updateProfile')
    @UserProtected()
    @AuthJwtAccessProtected()
    @Patch('/profile/update')
    async updateProfile(
        @GetUser() userAuth: UserEntity,
        @Body() payload: UserUpdateProfileDTO
    ) {
        return await this.commandBus.execute(
            new UserUpdateProfileCommand(userAuth, payload)
        );
    }
}
