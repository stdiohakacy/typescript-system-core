import { BaseDTO } from '../../base/dto/base.dto';
import {
    ENUM_LOGGER_ACTION,
    ENUM_LOGGER_LEVEL,
} from '../constants/logger.enum.constant';
import { ENUM_REQUEST_METHOD } from '../../request/constants/request.enum.constant';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LoggerEntity } from '../../../modules/logger/entities/logger.entity';

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
    tags?: string[];
    params?: Record<string, any>;
    bodies?: Record<string, any>;
    statusCode?: number;
}

export class LoggerCreateRawDTO extends LoggerCreateDTO {
    level: ENUM_LOGGER_LEVEL;
}
