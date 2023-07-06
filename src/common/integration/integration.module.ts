import { Module } from '@nestjs/common';
import { StorageModule } from './storage/storage.module';
import { AwsS3Service } from '../aws/services/aws.s3.service';

@Module({
    imports: [StorageModule],
    exports: [StorageModule],
    providers: [AwsS3Service],
    controllers: [],
})
export class IntegrationModule {}
