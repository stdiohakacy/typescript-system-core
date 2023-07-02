import { faker } from '@faker-js/faker';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ApiKeyDTO } from "./api-key.dto";
import {
    IsNotEmpty,
    IsString,
    MaxLength,
} from 'class-validator';

export class ApiKeyCreateRawDTO extends PartialType(ApiKeyDTO)  {
    @ApiProperty({
        name: 'key',
        example: faker.random.alphaNumeric(10),
        required: true,
        nullable: false,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    key: string;

    @ApiProperty({
        name: 'secret',
        example: faker.random.alphaNumeric(20),
        required: true,
        nullable: false,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    secret: string;
}
