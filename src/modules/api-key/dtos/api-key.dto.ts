import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsDate,
    IsEnum,
    IsNotEmpty,
    IsString,
    MaxLength,
} from 'class-validator';
import { ENUM_API_KEY_TYPE } from '../constant/api-key.enum.constant';
import { MinDateToday } from '../../../common/request/validations/request.min-date-today.validation';
import { MinGreaterThanEqual } from '../../../common/request/validations/request.min-greater-than-equal.validation';
import { BaseDTO } from '../../..//common/base/dto/base.dto';

export class ApiKeyDTO extends BaseDTO {
    @ApiProperty({
        description: 'Api Key name',
        example: `testapiname`,
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;

    @ApiProperty({
        description: 'Api Key name',
        example: ENUM_API_KEY_TYPE.PUBLIC,
        required: true,
        enum: ENUM_API_KEY_TYPE,
    })
    @IsNotEmpty()
    @IsEnum(ENUM_API_KEY_TYPE)
    type: ENUM_API_KEY_TYPE;

    @ApiProperty({
        description: 'Api Key start date',
        example: faker.date.recent(),
        required: false,
        nullable: true,
    })
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    @MinDateToday()
    startDate: Date;

    @ApiProperty({
        description: 'Api Key end date',
        example: faker.date.recent(),
        required: false,
        nullable: true,
    })
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    @MinGreaterThanEqual('startDate')
    endDate: Date;
}

