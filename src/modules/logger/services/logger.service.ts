import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ILoggerService } from '../interfaces/logger.service.interface';
import { LoggerCreateDTO, LoggerCreateRawDTO } from '../dto/logger.dto';
import { LoggerEntity } from '../entities/logger.entity';
import { ENUM_LOGGER_LEVEL } from '../constants/logger.enum.constant';

@Injectable()
export class LoggerService implements ILoggerService {
    constructor(
        @InjectRepository(LoggerEntity)
        private loggerRepo: Repository<LoggerEntity>
    ) {}
    async info({
        action,
        description,
        userId,
        method,
        requestId,
        roleId,
        type,
        params,
        bodies,
        path,
        statusCode,
        tags,
    }: LoggerCreateDTO) {
        const logger = new LoggerEntity();
        logger.level = ENUM_LOGGER_LEVEL.INFO;
        logger.userId = userId;
        logger.anonymous = !userId;
        logger.action = action;
        logger.description = description;
        logger.method = method;
        logger.requestId = requestId;
        logger.roleId = roleId;
        logger.type = type;
        logger.params = params;
        logger.bodies = bodies;
        logger.path = path;
        logger.statusCode = statusCode;
        logger.tags = tags;

        return await this.loggerRepo.save<LoggerEntity>(logger);
    }
    async debug({
        action,
        description,
        userId,
        method,
        requestId,
        roleId,
        type,
        params,
        bodies,
        path,
        statusCode,
        tags,
    }: LoggerCreateDTO) {
        const logger: LoggerEntity = new LoggerEntity();
        logger.level = ENUM_LOGGER_LEVEL.DEBUG;
        logger.userId = userId;
        logger.anonymous = !userId;
        logger.action = action;
        logger.description = description;
        logger.method = method;
        logger.requestId = requestId;
        logger.roleId = roleId;
        logger.type = type;
        logger.params = params;
        logger.bodies = bodies;
        logger.path = path;
        logger.statusCode = statusCode;
        logger.tags = tags;

        return await this.loggerRepo.save<LoggerEntity>(logger);
    }
    async warn({
        action,
        description,
        userId,
        method,
        requestId,
        roleId,
        type,
        params,
        bodies,
        path,
        statusCode,
        tags,
    }: LoggerCreateDTO) {
        const logger: LoggerEntity = new LoggerEntity();
        logger.level = ENUM_LOGGER_LEVEL.WARN;
        logger.userId = userId;
        logger.anonymous = !userId;
        logger.action = action;
        logger.description = description;
        logger.method = method;
        logger.requestId = requestId;
        logger.roleId = roleId;
        logger.type = type;
        logger.params = params;
        logger.bodies = bodies;
        logger.path = path;
        logger.statusCode = statusCode;
        logger.tags = tags;

        return await this.loggerRepo.save<LoggerEntity>(logger);
    }
    async fatal({
        action,
        description,
        userId,
        method,
        requestId,
        roleId,
        type,
        params,
        bodies,
        path,
        statusCode,
        tags,
    }: LoggerCreateDTO) {
        const logger: LoggerEntity = new LoggerEntity();
        logger.level = ENUM_LOGGER_LEVEL.FATAL;
        logger.userId = userId;
        logger.anonymous = !userId;
        logger.action = action;
        logger.description = description;
        logger.method = method;
        logger.requestId = requestId;
        logger.roleId = roleId;
        logger.type = type;
        logger.params = params;
        logger.bodies = bodies;
        logger.path = path;
        logger.statusCode = statusCode;
        logger.tags = tags;

        return await this.loggerRepo.save<LoggerEntity>(logger);
    }
    async raw({
        level,
        action,
        description,
        userId,
        method,
        requestId,
        roleId,
        type,
        params,
        bodies,
        path,
        statusCode,
        tags,
    }: LoggerCreateRawDTO) {
        const logger: LoggerEntity = this.loggerRepo.create({
            level,
            userId,
            action,
            description,
            method,
            requestId,
            roleId,
            type,
            params,
            bodies,
            path,
            statusCode,
            tags,
            anonymous: !userId,
        });

        return await this.loggerRepo.save<LoggerEntity>(logger);
    }
}
