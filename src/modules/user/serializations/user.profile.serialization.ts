import { ApiHideProperty, OmitType } from '@nestjs/swagger';
import { UserGetSerialization } from './user.get.serialization';
import { Exclude } from 'class-transformer';
import { UserStatus } from '../constants/user.enum.constant';

export class UserProfileSerialization extends OmitType(UserGetSerialization, [
    'status',
    'blocked',
    'passwordExpired',
    'passwordCreated',
    'passwordAttempt',
    'blockedDate',
] as const) {
    @ApiHideProperty()
    @Exclude()
    readonly status: UserStatus;

    @ApiHideProperty()
    @Exclude()
    readonly blocked: boolean;

    @ApiHideProperty()
    @Exclude()
    readonly passwordExpired: Date;

    @ApiHideProperty()
    @Exclude()
    readonly passwordCreated: Date;

    @ApiHideProperty()
    @Exclude()
    readonly passwordAttempt: number;

    @ApiHideProperty()
    @Exclude()
    readonly blockedDate?: Date;
}
