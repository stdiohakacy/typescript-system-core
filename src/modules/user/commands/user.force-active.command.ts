import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';

export class UserForceActiveCommand implements ICommand {
    constructor(
        public readonly id: string,
        public readonly userAuth: UserEntity
    ) {}
}

@CommandHandler(UserForceActiveCommand)
export class UserForceActiveHandler
    implements ICommandHandler<UserForceActiveCommand>
{
    constructor(private readonly userService: UserService) {}

    async execute({ id, userAuth }: UserForceActiveCommand): Promise<void> {
        await this.userService.forceActive(id, userAuth);
    }
}
