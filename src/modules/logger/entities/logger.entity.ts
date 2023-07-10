import { UseDTO } from '../../../common/base/decorators/use-dto.decorator';
import {
    BaseEntity,
    IBaseEntity,
} from '../../../common/base/entity/base.entity';
import {
    ENUM_LOGGER_ACTION,
    ENUM_LOGGER_LEVEL,
} from '../../../common/logger/constants/logger.enum.constant';
import { LoggerDTO } from '../../../common/logger/dto/logger.dto';
import { ENUM_REQUEST_METHOD } from '../../../common/request/constants/request.enum.constant';
import { Column, Entity } from 'typeorm';

export interface ILoggerEntity extends IBaseEntity<LoggerDTO> {
    level: string;
    action: string;
    method: string;
    requestId?: string;
    user?: string;
    role?: string;
    apiKey?: string;
    anonymous: boolean;
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
