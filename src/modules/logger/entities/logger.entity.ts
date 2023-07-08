import { Column, Entity } from 'typeorm';
import { LoggerDTO } from '../dto/logger.dto';
import {
    ENUM_LOGGER_ACTION,
    ENUM_LOGGER_LEVEL,
} from '../constants/logger.enum.constant';
import {
    BaseEntity,
    IBaseEntity,
} from '../../../common/base/entity/base.entity';
import { UseDTO } from '../../../common/base/decorators/use-dto.decorator';
import { ENUM_REQUEST_METHOD } from '../../../common/request/constants/request.enum.constant';

export interface ILoggerEntity extends IBaseEntity<LoggerDTO> {
    level: string;
    action: string;
    method: string;
    requestId?: string;
    user?: string;
    role?: string;
    apiKey?: string;
    anonymous: boolean;
    // type?: ENUM_ROLE_TYPE;
    description: string;
    params?: Record<string, any>;
    bodies?: Record<string, any>;
    statusCode?: number;
    path?: string;
    tags: string[];
}
@Entity({ name: 'loggers' })
@UseDTO(LoggerDTO)
export class LoggerEntity
    extends BaseEntity<LoggerDTO>
    implements ILoggerEntity
{
    @Column({ enum: ENUM_LOGGER_LEVEL, name: 'level' })
    level: string;

    @Column({ enum: ENUM_LOGGER_ACTION, name: 'action' })
    action: string;

    @Column({ enum: ENUM_REQUEST_METHOD, name: 'method' })
    method: string;

    @Column({ nullable: true, name: 'requestId' })
    requestId?: string;

    @Column({ nullable: true, name: 'userId' })
    userId?: string;

    @Column({ nullable: true, name: 'roleId' })
    roleId?: string;

    @Column({ nullable: true, default: true, name: 'anonymous' })
    anonymous: boolean;

    // @Column({ nullable: true, enum: ENUM_ROLE_TYPE, name: 'type' })
    // type?: ENUM_ROLE_TYPE;

    @Column({ name: 'description' })
    description: string;

    @Column({ nullable: true, name: 'params', type: 'jsonb' })
    params?: Record<string, any>;

    @Column({ nullable: true, name: 'bodies', type: 'jsonb' })
    bodies?: Record<string, any>;

    @Column({ nullable: true, name: 'statusCode' })
    statusCode?: number;

    @Column({ nullable: true, name: 'path' })
    path?: string;

    @Column({ nullable: true, default: [], type: 'jsonb' })
    tags: string[];
}
