import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { UserUpdateNameDTO } from '../dtos/user.update-name.dto';

export class UserUpdateNameCommand implements ICommand {
    constructor(
        public readonly id: string,
        public readonly payload: UserUpdateNameDTO,
        public readonly userAuth: UserEntity
    ) {}
}

@CommandHandler(UserUpdateNameCommand)
export class UserUpdateNameHandler
    implements ICommandHandler<UserUpdateNameCommand>
{
    constructor(private readonly userService: UserService) {}
    async execute({ payload, userAuth, id }: UserUpdateNameCommand) {
        return await this.userService.updateName(id, payload, userAuth);
    }
}
