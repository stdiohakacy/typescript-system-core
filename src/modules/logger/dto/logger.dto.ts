import { BaseDTO } from '../../../common/base/dto/base.dto';
import { LoggerEntity } from '../entities/logger.entity';
import {
    ENUM_LOGGER_ACTION,
    ENUM_LOGGER_LEVEL,
} from '../constants/logger.enum.constant';
import { ENUM_REQUEST_METHOD } from '../../../common/request/constants/request.enum.constant';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoggerDTO extends BaseDTO {
    @ApiProperty()
    level: string;

    @ApiProperty()
    action: string;

    @ApiProperty()
    method: string;

    @ApiPropertyOptional()
    requestId?: string;

    @ApiPropertyOptional()
    userId?: string;

    @ApiPropertyOptional()
    roleId?: string;

    @ApiProperty()
    anonymous: boolean;

    // @ApiPropertyOptional({ enum: ENUM_ROLE_TYPE })
    // type?: ENUM_ROLE_TYPE;

    @ApiProperty()
    description: string;

    @ApiProperty()
    params?: Record<string, any>;

    @ApiPropertyOptional()
    bodies?: Record<string, any>;

    @ApiPropertyOptional()
    statusCode?: number;

    @ApiPropertyOptional()
    path?: string;

    @ApiProperty()
    tags: string[];

    constructor(entity: LoggerEntity) {
        super(entity);
        this.level = entity.level;
        this.action = entity.action;
        this.method = entity.method;
        this.requestId = entity.requestId;
        this.userId = entity.userId;
        this.roleId = entity.roleId;
        this.anonymous = entity.anonymous;
        // this.type = entity.type;
        this.description = entity.description;
        this.params = entity.params;
        this.bodies = entity.bodies;
        this.statusCode = entity.statusCode;
        this.path = entity.path;
        this.tags = entity.tags;
    }
}

export class LoggerCreateDTO {
    action: ENUM_LOGGER_ACTION;
    description: string;
    apiKey?: string;
    userId?: string;
    requestId?: string;
    method: ENUM_REQUEST_METHOD;
    path: string;
    roleId?: string;
    // type?: ENUM_ROLE_TYPE;
    tags?: string[];
    params?: Record<string, any>;
    bodies?: Record<string, any>;
    statusCode?: number;
}

export class LoggerCreateRawDTO extends LoggerCreateDTO {
    level: ENUM_LOGGER_LEVEL;
}
