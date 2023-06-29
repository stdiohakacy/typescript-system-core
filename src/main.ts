import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import morgan from 'morgan';
import { ConfigService } from '@nestjs/config';
import { Logger, VersioningType } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { middleware as expressCtx } from 'express-ctx';
import setupSwagger from './swagger';
import { initializeTransactionalContext } from 'typeorm-transactional';

export async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create<NestApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      cors: true,
    },
  );

  const configService = app.get(ConfigService);
  const databaseHost: string = configService.get<string>('database.host');
  const databasePort: string = configService.get<string>('database.port');
  const databaseUri = `${databaseHost}:${databasePort}`;
  const env: string = configService.get<string>('app.env');
  const port: number = configService.get<number>('app.http.port');
  const globalPrefix: string = configService.get<string>('app.globalPrefix');
  const versioningPrefix: string = configService.get<string>(
    'app.versioning.prefix',
  );
  const version: string = configService.get<string>('app.versioning.version');

  // enable
  const httpEnable: boolean = configService.get<boolean>('app.http.enable');
  const versionEnable: string = configService.get<string>(
    'app.versioning.enable',
  );
  const jobEnable: boolean = configService.get<boolean>('app.jobEnable');
  const documentationEnable: boolean = configService.get<boolean>(
    'app.documentationEnable',
  );

  const logger = new Logger();
  process.env.NODE_ENV = env;

  app.setGlobalPrefix(globalPrefix);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  app.use(compression());
  app.use(morgan('combined'));

  // Versioning
  if (versionEnable) {
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: version,
      prefix: versioningPrefix,
    });
  }

  if (documentationEnable) {
    setupSwagger(app);
  }

  app.use(expressCtx);
  await app.listen(port);
  logger.log(`==========================================================`);
  logger.log(`Environment Variable`, 'NestApplication');
  // logger.log(JSON.parse(JSON.stringify(process.env)), 'NestApplication');
  logger.log(`==========================================================`);
  logger.log(`Job is ${jobEnable}`, 'NestApplication');
  logger.log(
    `Http is ${httpEnable}, ${
      httpEnable ? 'routes registered' : 'no routes registered'
    }`,
    'NestApplication',
  );
  logger.log(`Http versioning is ${versionEnable}`, 'NestApplication');
  logger.log(`Http Server running on ${await app.getUrl()}`, 'NestApplication');
  logger.log(`Documentation: http://localhost:${port}/documentation`);
  logger.log(`Database uri ${databaseUri}`, 'NestApplication');
  logger.log(`==========================================================`);
  return app;
}
void bootstrap();
