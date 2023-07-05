import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    MinLength,
    ValidateIf,
    isNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { faker } from '@faker-js/faker';
import { BaseDTO } from '../../../common/base/dto/base.dto';
import { UserEntity } from '../entities/user.entity';
import { IsPasswordStrong } from '../../../common/request/validations/request.is-password-strong.validation';
import { MobileNumberAllowed } from '../../../common/request/validations/request.mobile-number-allowed.validation';

export class UserDTO extends BaseDTO {
    @ApiProperty({
        example: faker.internet.userName(
            faker.name.firstName(),
            faker.name.lastName()
        ),
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(30)
    @Type(() => String)
    username: string;

    @ApiProperty({ example: faker.name.firstName(), required: true })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(30)
    @Type(() => String)
    firstName: string;

    @ApiProperty({ example: faker.name.lastName(), required: true })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(30)
    @Type(() => String)
    lastName: string;

    @ApiProperty({
        example: faker.phone.number('62812#########'),
        required: true,
    })
    @IsString()
    @MinLength(10)
    @MaxLength(14)
    @IsNotEmpty()
    @ValidateIf((e) => e.mobileNumber !== '')
    @Type(() => String)
    @MobileNumberAllowed()
    phone: string;

    @ApiProperty({ example: faker.internet.email(), required: true })
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100)
    @Type(() => String)
    email: string;

    @ApiProperty({
        description: 'string password',
        example: `${faker.random.alphaNumeric(5).toLowerCase()}${faker.random
            .alphaNumeric(5)
            .toUpperCase()}@@!123`,
        required: true,
    })
    @IsNotEmpty()
    @IsPasswordStrong()
    @MaxLength(50)
    password: string;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    passwordExpired: Date;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    passwordCreated: Date;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    passwordAttempt: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    salt: string;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    blocked: boolean;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    blockedAt: Date;

    @ApiProperty({
        example:
            'bda2313317b383b4d106647cd412bb7ec9bb02693782a5938cb3b444dccf4fdc',
        required: true,
    })
    @IsNotEmpty()
    activeKey: string;

    @ApiProperty()
    @Type(() => Date)
    @IsNotEmpty()
    activatedAt: Date;

    @ApiProperty({
        example:
            'bda2313317b383b4d106647cd412bb7ec9bb02693782a5938cb3b444dccf4fdc',
        required: true,
    })
    @IsNotEmpty()
    forgotKey: string;

    @ApiProperty()
    @Type(() => Date)
    @IsNotEmpty()
    forgotExpire: Date;

    constructor(user: UserEntity) {
        super(user);
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.phone = user.phone;
        this.email = user.email;
        this.passwordExpired = user.passwordExpired;
        this.passwordCreated = user.passwordCreated;
        this.passwordAttempt = user.passwordAttempt;
        this.salt = user.salt;
        this.blocked = user.blocked;
        this.blockedAt = user.blockedAt;
        this.activeKey = user.activeKey;
        this.activatedAt = user.activatedAt;
    }
}
