import { registerAs } from '@nestjs/config';

export default registerAs(
  'database',
  (): Record<string, any> => ({
    host: process.env?.DATABASE_HOST ?? 'postgres',
    port: process.env?.DATABASE_PORT ?? '5432',
    name: process.env?.DATABASE_NAME ?? 'parking-spot-db',
    username: process.env?.DATABASE_USER,
    password: process?.env.DATABASE_PASSWORD,
    debug: process.env.DATABASE_DEBUG === 'true',
    options: process.env?.DATABASE_OPTIONS,
  }),
);
