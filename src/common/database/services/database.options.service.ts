import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDatabaseOptionService } from '../interfaces/database.options-service.interface';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import path from 'path';
import { SnakeNamingStrategy } from 'src/snake-naming-strategy';

@Injectable()
export class DatabaseOptionService implements IDatabaseOptionService {
    constructor(private readonly configService: ConfigService) {}

    createOption(): TypeOrmModuleOptions {
        const env = this.configService.get<string>('app.env');
        const host = this.configService.get<string>('database.host');
        const port = this.configService.get<number>('database.port');
        const database = this.configService.get<string>('database.name');
        const username = this.configService.get<string>('database.username');
        const password = this.configService.get<string>('database.password');
        const debug = this.configService.get<boolean>('database.debug');
        const options = this.configService.get<string>('database.options')
            ? `?${this.configService.get<string>('database.options')}`
            : '';

        return {
            entities: [
                path.join(__dirname, '../../../modules/**/entities/*{.ts,.js}'),
            ],
            migrations: [],
            // keepConnectionAlive: !this.isTest,
            // dropSchema: this.isTest,
            type: 'postgres',
            name: 'default',
            host,
            port,
            username,
            password,
            database,
            subscribers: [],
            migrationsRun: true,
            // logging: this.getBoolean('ENABLE_ORM_LOGS'),
            // namingStrategy: new SnakeNamingStrategy(),
        };
    }
}
