import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from '../services/user.service';

export class UserExportCommand implements ICommand {
    constructor() {}
}

@CommandHandler(UserExportCommand)
export class UserExportHandler implements ICommandHandler<UserExportCommand> {
    constructor(private readonly userService: UserService) {}

    async execute() {
        const users = await this.userService.findAll({});
        return { data: users };
    }
}
