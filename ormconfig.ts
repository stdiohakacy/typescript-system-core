import './src/boilerplate.polyfill';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from './src/snake-naming-strategy';
dotenv.config();

export const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    // namingStrategy: new SnakeNamingStrategy(),
    subscribers: [],
    entities: [
        'src/modules/**/*.entity{.ts,.js}',
        'src/modules/**/*.view-entity{.ts,.js}',
    ],
    migrations: ['src/migrations/*{.ts,.js}'],
});
