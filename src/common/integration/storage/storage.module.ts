import { Module } from '@nestjs/common';
import { AwsS3Service } from './aws/services/aws.s3.service';

@Module({
    imports: [],
    exports: [AwsS3Service],
    providers: [AwsS3Service],
    controllers: [],
})
export class StorageModule {}
