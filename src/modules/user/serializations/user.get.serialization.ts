import { faker } from '@faker-js/faker';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { ResponseIdSerialization } from 'src/common/response/serializations/response.id.serialization';
import {
    ENUM_USER_SIGN_UP_FROM,
    ENUM_USER_STATUS,
} from '../constants/user.enum.constant';
import { AwsS3Serialization } from '../../../common/aws/serializations/aws.s3.serialization';

export class UserGetSerialization extends ResponseIdSerialization {
    @ApiProperty({
        example: faker.internet.userName(),
        nullable: true,
        required: false,
    })
    readonly username?: string;

    @ApiProperty({
        required: true,
        nullable: false,
        example: ENUM_USER_SIGN_UP_FROM.LOCAL,
    })
    readonly signUpFrom: ENUM_USER_SIGN_UP_FROM;

    @ApiProperty({
        nullable: true,
        required: false,
        type: () => AwsS3Serialization,
    })
    @Type(() => AwsS3Serialization)
    readonly photo?: AwsS3Serialization;

    @ApiProperty({
        required: true,
        nullable: false,
        example: faker.internet.email(),
    })
    readonly email: string;

    @ApiProperty({
        nullable: true,
        required: false,
        example: faker.phone.number('501-###-###'),
    })
    readonly phone?: string;

    @ApiProperty({
        required: true,
        nullable: false,
        example: ENUM_USER_STATUS.ACTIVE,
    })
    readonly status: ENUM_USER_STATUS;

    @ApiProperty({
        required: true,
        nullable: false,
        example: false,
    })
    readonly blocked: boolean;

    @ApiProperty({
        nullable: true,
        required: false,
        example: faker.date.recent(),
    })
    readonly blockedDate?: Date;

    @ApiProperty({
        required: true,
        nullable: false,
        example: faker.person.firstName(),
    })
    readonly firstName: string;

    @ApiProperty({
        required: true,
        nullable: false,
        example: faker.person.lastName(),
    })
    readonly lastName: string;

    @ApiHideProperty()
    @Exclude()
    readonly password: string;

    @ApiProperty({
        required: true,
        nullable: false,
        example: faker.date.future(),
    })
    readonly passwordExpired: Date;

    @ApiProperty({
        required: true,
        nullable: false,
        example: faker.date.past(),
    })
    readonly passwordCreated: Date;

    @ApiProperty({
        required: true,
        nullable: false,
        example: [1, 0],
    })
    readonly passwordAttempt: number;

    @ApiHideProperty()
    @Exclude()
    readonly salt: string;

    @ApiProperty({
        description: 'Date created at',
        example: faker.date.recent(),
        required: true,
        nullable: false,
    })
    readonly createdAt: Date;

    @ApiProperty({
        description: 'Date updated at',
        example: faker.date.recent(),
        required: true,
        nullable: false,
    })
    readonly updatedAt: Date;

    @ApiHideProperty()
    @Exclude()
    readonly deletedAt?: Date;

    @ApiHideProperty()
    @Exclude()
    readonly createdBy: string;

    @ApiHideProperty()
    @Exclude()
    readonly updatedBy: string;

    @ApiHideProperty()
    @Exclude()
    readonly deletedBy: string;

    @ApiHideProperty()
    @Exclude()
    readonly blockedAt: string;

    @ApiHideProperty()
    @Exclude()
    readonly activeKey: string;

    @ApiHideProperty()
    @Exclude()
    readonly activeExpire: string;

    @ApiHideProperty()
    @Exclude()
    readonly activatedAt: string;

    @ApiHideProperty()
    @Exclude()
    readonly forgotKey: string;

    @ApiHideProperty()
    @Exclude()
    readonly forgotExpire: string;
}
