import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
    ValidateIf,
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
    @IsOptional()
    @MinLength(10)
    @MaxLength(14)
    @ValidateIf((e) => e.mobileNumber !== '')
    @Type(() => String)
    @MobileNumberAllowed()
    phone?: string;

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

    @ApiPropertyOptional()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    passwordExpired?: Date;

    @ApiPropertyOptional()
    @IsDate()
    @Type(() => Date)
    passwordCreated?: Date;

    @ApiPropertyOptional()
    @IsNumber()
    passwordAttempt?: number;

    @ApiProperty()
    @IsString()
    salt?: string;

    @ApiProperty()
    @IsBoolean()
    isActive: boolean;

    @ApiProperty()
    @IsBoolean()
    inactivePermanent: boolean;

    @ApiProperty()
    @IsDate()
    inactiveAt: Date;

    @ApiPropertyOptional()
    @IsBoolean()
    blocked?: boolean;

    @ApiPropertyOptional()
    @IsDate()
    blockedAt?: Date;

    constructor(user: UserEntity) {
        super(user);
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.phone = user.phone;
        this.email = user.email;
        this.password = user.password;
        this.passwordExpired = user.passwordExpired;
        this.passwordCreated = user.passwordCreated;
        this.passwordAttempt = user.passwordAttempt;
        this.salt = user.salt;
        this.isActive = user.isActive;
        this.inactivePermanent = user.inactivePermanent;
        this.inactiveAt = user.inactiveAt;
        this.blocked = user.blocked;
        this.blockedAt = user.blockedAt;
    }
}
