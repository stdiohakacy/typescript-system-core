import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DebuggerModule } from 'src/common/debugger/debugger.module';
import { HelperModule } from 'src/common/helper/helper.module';
import { ErrorModule } from 'src/common/error/error.module';
import { ResponseModule } from 'src/common/response/response.module';
import { AuthModule } from 'src/common/auth/auth.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import Joi from 'joi';
import configs from 'src/configs';
import { DatabaseOptionService } from 'src/common/database/services/database.options.service';
import { ENUM_APP_ENVIRONMENT } from 'src/app/constants/app.enum.constant';
import { APP_LANGUAGE } from 'src/app/constants/app.constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { ENUM_MESSAGE_LANGUAGE } from './message/constant/message.enum.constant';
import { DatabaseOptionsModule } from './database/database.options.module';
import { MessageModule } from './message/message.module';
import { LoggerModule } from '../modules/logger/logger.module';

@Module({
    controllers: [],
    providers: [],
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
                SSO_GOOGLE_CALLBACK_URL_LOGIN: Joi.string()
                    .allow(null, '')
                    .uri()
                    .optional(),
                SSO_GOOGLE_CALLBACK_URL_SIGN_UP: Joi.string()
                    .allow(null, '')
                    .uri()
                    .optional(),
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: true,
            },
        }),
        TypeOrmModule.forRootAsync({
            imports: [DatabaseOptionsModule],
            useFactory: (dbOptionService: DatabaseOptionService) =>
                dbOptionService.createOption(),
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
        DebuggerModule.forRoot(),
        AuthModule.forRoot(),
    ],
})
export class CommonModule {}
