import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from '../services/user.service';
import { IFileExtract } from '../../../common/file/interfaces/file.interface';
import { UserImportDTO } from '../dtos/user.import.dto';
import { AuthService } from 'src/common/authentication/services/auth.service';
import { RBACUserRoleService } from 'src/common/authorization/rbac/services/rbac.user-role.service';
import { RBACRoleService } from 'src/common/authorization/rbac/services/rbac.role.service';
import { ENUM_RBAC_ROLE_TYPE } from 'src/common/authorization/rbac/constants/rbac.enum.role.constant';

export class UserImportCommand implements ICommand {
    constructor(public readonly file: IFileExtract<UserImportDTO>) {}
}

@CommandHandler(UserImportCommand)
export class UserImportHandler implements ICommandHandler<UserImportCommand> {
    constructor(
        private readonly userService: UserService,
        private readonly userRoleService: RBACUserRoleService,
        private readonly authService: AuthService,
        private readonly roleService: RBACRoleService
    ) {}

    async execute({ file }: UserImportCommand): Promise<void> {
        const role = await this.roleService.findOneByName(
            ENUM_RBAC_ROLE_TYPE.USER
        );
        const passwordString: string =
            await this.authService.createPasswordRandom();
        const password = await this.authService.createPassword(passwordString);

        const users = await this.userService.import(file.dto, password);

        await this.userRoleService.createMany(
            users.map((user) => ({
                userId: user.id,
                roleId: role.id,
            }))
        );
    }
}
