import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UserRegisterDTO } from '../dtos/user.register.dto';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { ConfigService } from '@nestjs/config';
import { IMailService } from '../../../common/integration/mail/interfaces/mail.service.interface';
import { MailServiceFactory } from '../../../common/integration/mail/factory/mail.factory.service';
import { ConflictException } from '@nestjs/common';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';
import { ENUM_MAIL_PROVIDER_TYPE } from '../../../common/integration/mail/constants/mail.enum.constant';
import { AuthService } from '../../../modules/auth/services/auth.service';

export class UserRegisterCommand implements ICommand {
    constructor(public readonly payload: UserRegisterDTO) {}
}

@CommandHandler(UserRegisterCommand)
export class UserRegisterHandler
    implements ICommandHandler<UserRegisterCommand, UserEntity>
{
    private mailService: IMailService;

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly mailServiceFactory: MailServiceFactory
    ) {}

    async execute({ payload }: UserRegisterCommand): Promise<UserEntity> {
        const usernameExist = await this.userService.findOneByUsername(
            payload.username
        );
        if (usernameExist) {
            throw new ConflictException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_USERNAME_EXISTS_ERROR,
                message: 'user.error.usernameExist',
            });
        }
        const passwordAuth = await this.authService.createPassword(
            payload.password
        );

        this.mailService = this.mailServiceFactory.createService(
            ENUM_MAIL_PROVIDER_TYPE.SEND_IN_BLUE
        );

        // this.mailService.sendEmail(
        //     'elasticsearch22101995@gmail.com',
        //     'Account activation',
        //     'Test account activation'
        // );

        return await this.userService.create(payload, passwordAuth);
    }
}
