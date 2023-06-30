import { BaseDTO } from '../../../common/base/dto/base.dto';
import { LoggerEntity } from '../repository/entities/logger.entity';
import {
    ENUM_LOGGER_ACTION,
    ENUM_LOGGER_LEVEL,
} from '../constants/logger.enum.constant';
import { ENUM_REQUEST_METHOD } from '../../../common/request/constants/request.enum.constant';
import { ENUM_ROLE_TYPE } from '../../role/constant/role.enum.constant';

export class LoggerDTO extends BaseDTO {
    constructor(loggerEntity: LoggerEntity) {
        super(loggerEntity);
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
    type?: ENUM_ROLE_TYPE;
    tags?: string[];
    params?: Record<string, any>;
    bodies?: Record<string, any>;
    statusCode?: number;
}

export class LoggerCreateRawDto extends LoggerCreateDTO {
    level: ENUM_LOGGER_LEVEL;
}
