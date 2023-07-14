import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UserClaimUsernameDTO } from '../dtos/user.claim-username.dto';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { ConflictException } from '@nestjs/common';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';

export class UserBlockCommand implements ICommand {
    constructor(
        public readonly id: string,
        public readonly updatedBy: UserEntity
    ) {}
}

@CommandHandler(UserBlockCommand)
export class UserBlockHandler implements ICommandHandler<UserBlockCommand> {
    constructor(private readonly userService: UserService) {}

    async execute({ id, updatedBy }: UserBlockCommand) {
        await this.userService.block(id, updatedBy);
    }
}
