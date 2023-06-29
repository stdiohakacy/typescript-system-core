import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDatabaseOptionsService } from '../interface/database.options-service.interface';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class DatabaseOptionsService implements IDatabaseOptionsService {
  constructor(private readonly configService: ConfigService) {}

  createOptions(): TypeOrmModuleOptions {
    const host = this.configService.get<string>('database.host');
    const port = this.configService.get<number>('database.port');
    const database = this.configService.get<string>('database.name');
    const username = this.configService.get<string>('database.username');
    const password = this.configService.get<string>('database.password');

    let entities = [
      // __dirname + '/../../modules/**/*.entity{.ts,.js}',
      // __dirname + '/../../modules/**/*.view-entity{.ts,.js}',
    ];
    let migrations = []; // __dirname + '/../../database/migrations/*{.ts,.js}'

    return {
      entities,
      migrations,
      //   keepConnectionAlive: !this.isTest,
      //   dropSchema: this.isTest,
      type: 'postgres',
      name: 'default',
      host,
      port,
      username,
      password,
      database,
      subscribers: [],
      migrationsRun: true,
      //   logging: false,
      //   namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
