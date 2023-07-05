import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsPasswordStrong } from '../../../common/request/validations/request.is-password-strong.validation';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UserChangePasswordDTO {
    @ApiProperty({
        description: 'old string password',
        example: `${faker.string.alphanumeric(5).toLowerCase()}${faker.string
            .alphanumeric(5)
            .toUpperCase()}@@!123`,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    readonly oldPassword: string;

    @ApiProperty({
        description:
            "new string password, newPassword can't same with oldPassword",
        example: `${faker.string.alphanumeric(5).toLowerCase()}${faker.string
            .alphanumeric(5)
            .toUpperCase()}@@!123`,
        required: true,
    })
    @IsPasswordStrong()
    @IsNotEmpty()
    @MaxLength(50)
    readonly newPassword: string;
}
