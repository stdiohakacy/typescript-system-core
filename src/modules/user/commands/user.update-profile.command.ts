import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UserUpdateProfileDTO } from '../dtos/user.update-profile.dto';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';

export class UserUpdateProfileCommand implements ICommand {
    constructor(
        public readonly userAuth: UserEntity,
        public readonly payload: UserUpdateProfileDTO
    ) {}
}

@CommandHandler(UserUpdateProfileCommand)
export class UserUpdateProfileHandler
    implements ICommandHandler<UserUpdateProfileCommand>
{
    constructor(private readonly userService: UserService) {}
    async execute({ payload, userAuth }: UserUpdateProfileCommand) {
        await this.userService.updateProfile(userAuth, payload);
    }
}
