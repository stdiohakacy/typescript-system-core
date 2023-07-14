import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';

export class UserForceDeleteCommand implements ICommand {
    constructor(
        public readonly id: string,
        public readonly deletedBy: UserEntity
    ) {}
}

@CommandHandler(UserForceDeleteCommand)
export class UserForceDeleteHandler
    implements ICommandHandler<UserForceDeleteCommand>
{
    constructor(private readonly userService: UserService) {}

    async execute({ id, deletedBy }: UserForceDeleteCommand): Promise<void> {
        await this.userService.forceDelete(id, deletedBy);
    }
}
