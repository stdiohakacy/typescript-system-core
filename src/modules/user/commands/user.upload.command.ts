import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { IFile } from '../../../common/file/interfaces/file.interface';
import { AwsS3Service } from '../../../common/integration/storage/aws/services/aws.s3.service';
import { InternalServerErrorException } from '@nestjs/common';
import { ENUM_ERROR_STATUS_CODE_ERROR } from '../../../common/error/constants/error.status-code.constant';

export class UserUploadCommand implements ICommand {
    constructor(
        public readonly userAuth: UserEntity,
        public readonly file: IFile
    ) {}
}

@CommandHandler(UserUploadCommand)
export class UserUploadHandler implements ICommandHandler<UserUploadCommand> {
    constructor(
        private readonly userService: UserService,
        private readonly awsS3Service: AwsS3Service
    ) {}

    async execute({ file, userAuth }: UserUploadCommand) {
        const filename: string = file.originalname;
        const content: Buffer = file.buffer;
        const mime: string = filename
            .substring(filename.lastIndexOf('.') + 1, filename.length)
            .toLowerCase();

        const path = await this.userService.createPhotoFilename();

        try {
            const aws = await this.awsS3Service.putItemInBucket(
                `${path.filename}.${mime}`,
                content,
                { path: `${path.path}/${userAuth.id}` }
            );

            console.log(aws);
            // await this.userService.updatePhoto(user, aws);
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                _error: err.message,
            });
        }
    }
}
