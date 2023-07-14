import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';

export class UserInActiveCommand implements ICommand {
    constructor(
        public readonly id: string,
        public readonly updatedBy: UserEntity
    ) {}
}

@CommandHandler(UserInActiveCommand)
export class UserInActiveHandler
    implements ICommandHandler<UserInActiveCommand>
{
    constructor(private readonly userService: UserService) {}

    async execute({ updatedBy, id }: UserInActiveCommand): Promise<void> {
        await this.userService.inactive(id, updatedBy);
    }
}
