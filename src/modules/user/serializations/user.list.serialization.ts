import { ApiHideProperty, ApiProperty, OmitType } from '@nestjs/swagger';
import { UserProfileSerialization } from './user.profile.serialization';
import { AwsS3Serialization } from 'src/common/aws/serializations/aws.s3.serialization';
import { Exclude } from 'class-transformer';

export class UserListSerialization extends OmitType(UserProfileSerialization, [
    'photo',
    'createdAt',
    'signUpFrom',
] as const) {
    @ApiHideProperty()
    @Exclude()
    readonly photo?: AwsS3Serialization;

    @ApiHideProperty()
    @Exclude()
    readonly signUpDate: Date;
}
