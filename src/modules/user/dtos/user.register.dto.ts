import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
    ValidateIf,
} from 'class-validator';
import { IsPasswordStrong } from '../../../common/request/validations/request.is-password-strong.validation';
import { MobileNumberAllowed } from '../../../common/request/validations/request.mobile-number-allowed.validation';

export class UserRegisterDTO {
    @ApiProperty({ example: faker.internet.email(), required: true })
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100)
    @Type(() => String)
    readonly email: string;

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
    readonly password: string;

    @ApiProperty({ example: faker.name.firstName(), required: true })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(30)
    @Type(() => String)
    readonly firstName: string;

    @ApiProperty({ example: faker.name.lastName(), required: true })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(30)
    @Type(() => String)
    readonly lastName: string;

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
    readonly mobileNumber?: string;

    // @ApiProperty({ example: faker.datatype.uuid(), required: true })
    // @IsNotEmpty()
    // @IsUUID('4')
    // readonly role: string;

    // @IsEnum(ENUM_USER_SIGN_UP_FROM)
    // @IsString()
    // @IsNotEmpty()
    // readonly signUpFrom: ENUM_USER_SIGN_UP_FROM;
}
