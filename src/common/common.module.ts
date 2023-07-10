import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import Joi from 'joi';
import { DebuggerModule } from '../common/debugger/debugger.module';
import { HelperModule } from '../common/helper/helper.module';
import { ErrorModule } from '../common/error/error.module';
import { ResponseModule } from '../common/response/response.module';
import { PaginationModule } from '../common/pagination/pagination.module';
import configs from '../configs';
import { DatabaseOptionService } from '../common/database/services/database.options.service';
import { ENUM_APP_ENVIRONMENT } from '../app/constants/app.enum.constant';
import { APP_LANGUAGE } from '../app/constants/app.constant';
import { ENUM_MESSAGE_LANGUAGE } from './message/constant/message.enum.constant';
import { DatabaseOptionsModule } from './database/database.options.module';
import { MessageModule } from './message/message.module';
import { LoggerModule } from '../modules/logger/logger.module';
import { MigrationApiKeySeed } from '../migrations/seeds/migration.api-key.seed';
import { ApiKeyModule } from '../modules/api-key/api-key.module';
import { MailModule } from './integration/mail/mail.module';
import { AuthModule } from './authentication/auth.module';

@Module({
    controllers: [],
    providers: [MigrationApiKeySeed],
    imports: [
        ConfigModule.forRoot({
            load: configs,
            isGlobal: true,
            cache: true,
            envFilePath: ['.env'],
            expandVariables: true,
            validationSchema: Joi.object({
                APP_NAME: Joi.string().required(),
                APP_ENV: Joi.string()
                    .valid(...Object.values(ENUM_APP_ENVIRONMENT))
                    .default('development')
                    .required(),
                APP_LANGUAGE: Joi.string()
                    .valid(...Object.values(ENUM_MESSAGE_LANGUAGE))
                    .default(APP_LANGUAGE)
                    .required(),

                HTTP_ENABLE: Joi.boolean().default(true).required(),
                HTTP_HOST: [
                    Joi.string().ip({ version: 'ipv4' }).required(),
                    Joi.valid('localhost').required(),
                ],
                HTTP_PORT: Joi.number().default(3000).required(),
                HTTP_VERSIONING_ENABLE: Joi.boolean().default(true).required(),
                HTTP_VERSION: Joi.number().required(),

                DEBUGGER_HTTP_WRITE_INTO_FILE: Joi.boolean()
                    .default(false)
                    .required(),
                DEBUGGER_HTTP_WRITE_INTO_CONSOLE: Joi.boolean()
                    .default(false)
                    .required(),
                DEBUGGER_SYSTEM_WRITE_INTO_FILE: Joi.boolean()
                    .default(false)
                    .required(),
                DEBUGGER_SYSTEM_WRITE_INTO_CONSOLE: Joi.boolean()
                    .default(false)
                    .required(),

                JOB_ENABLE: Joi.boolean().default(false).required(),

                DATABASE_HOST: Joi.string().default('127.0.0.1').required(),
                DATABASE_NAME: Joi.string()
                    .default('parking-plot-db')
                    .required(),
                DATABASE_USER: Joi.string().allow(null, 'postgres').optional(),
                DATABASE_PASSWORD: Joi.string()
                    .allow(null, 'postgres')
                    .optional(),
                DATABASE_DEBUG: Joi.boolean().default(false).required(),

                AUTH_JWT_SUBJECT: Joi.string().required(),
                AUTH_JWT_AUDIENCE: Joi.string().required(),
                AUTH_JWT_ISSUER: Joi.string().required(),

                AUTH_JWT_ACCESS_TOKEN_SECRET_KEY: Joi.string()
                    // .alphanum()
                    .min(5)
                    .max(5000)
                    .required(),
                AUTH_JWT_ACCESS_TOKEN_EXPIRED: Joi.string()
                    .default('15m')
                    .required(),

                AUTH_JWT_REFRESH_TOKEN_SECRET_KEY: Joi.string()
                    // .alphanum()
                    .min(5)
                    .max(5000)
                    .required(),
                AUTH_JWT_REFRESH_TOKEN_EXPIRED: Joi.string()
                    .default('7d')
                    .required(),
                AUTH_JWT_REFRESH_TOKEN_NOT_BEFORE_EXPIRATION: Joi.string()
                    .default('15m')
                    .required(),

                AUTH_JWT_PAYLOAD_ENCRYPT: Joi.boolean()
                    .default(false)
                    .required(),
                AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_KEY: Joi.string()
                    .allow(null, '')
                    .min(20)
                    .max(50)
                    .optional(),
                AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_IV: Joi.string()
                    .allow(null, '')
                    .min(16)
                    .max(50)
                    .optional(),
                AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_KEY: Joi.string()
                    .allow(null, '')
                    .min(20)
                    .max(50)
                    .optional(),
                AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_IV: Joi.string()
                    .allow(null, '')
                    .min(16)
                    .max(50)
                    .optional(),

                AWS_CREDENTIAL_KEY: Joi.string().allow(null, '').optional(),
                AWS_CREDENTIAL_SECRET: Joi.string().allow(null, '').optional(),
                AWS_S3_REGION: Joi.string().allow(null, '').optional(),
                AWS_S3_BUCKET: Joi.string().allow(null, '').optional(),

                SSO_GOOGLE_CLIENT_ID: Joi.string().allow(null, '').optional(),
                SSO_GOOGLE_CLIENT_SECRET: Joi.string()
                    .allow(null, '')
                    .optional(),

                SMTP_HOST: Joi.string().allow(null, '').optional(),
                SMTP_PORT: Joi.string().allow(null, '').optional(),
                SMTP_TLS: Joi.string().allow(null, '').optional(),
                SMTP_USERNAME: Joi.string().allow(null, '').optional(),
                SMTP_PASSWORD: Joi.string().allow(null, '').optional(),
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: true,
            },
        }),

        TypeOrmModule.forRootAsync({
            imports: [DatabaseOptionsModule],
            useFactory: (dbOptionService: DatabaseOptionService) => {
                return dbOptionService.createOption();
            },
            inject: [DatabaseOptionService],
            dataSourceFactory: async (options) => {
                if (!options) {
                    throw new Error('Invalid options passed');
                }
                return addTransactionalDataSource(new DataSource(options));
            },
        }),
        DatabaseOptionsModule,
        HelperModule,
        PaginationModule,
        ErrorModule,
        MessageModule,
        ResponseModule,
        LoggerModule,
        ApiKeyModule,
        MailModule,
        DebuggerModule.forRoot(),
        AuthModule.forRoot(),
    ],
})
export class CommonModule {}
