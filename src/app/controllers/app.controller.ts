import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { IResult } from 'ua-parser-js';
import { AppHelloApiKeyDoc, AppHelloDoc } from '../../app/docs/app.doc';
import { AppHelloSerialization } from '../../app/serializations/app.hello.serialization';
import { HelperDateService } from '../../common/helper/services/helper.date.service';
import { ENUM_LOGGER_ACTION } from '../../modules/logger/constants/logger.enum.constant';
import { Logger } from '../../modules/logger/decorators/logger.decorator';
import { RequestUserAgent } from '../../common/request/decorators/request.decorator';
import { Response } from '../../common/response/decorators/response.decorator';
import { IResponse } from '../../common/response/interfaces/response.interface';
import { ApiKeyPublicProtected } from '../../modules/api-key/decorators/api-key.decorator';

@ApiTags('hello')
@Controller({
    version: VERSION_NEUTRAL,
    path: '/',
})
export class AppController {
    private readonly serviceName: string;

    constructor(
        private readonly configService: ConfigService,
        private readonly helperDateService: HelperDateService
    ) {
        this.serviceName = this.configService.get<string>('app.name');
    }

    @AppHelloDoc()
    @Response('app.hello', { serialization: AppHelloSerialization })
    @Logger(ENUM_LOGGER_ACTION.TEST, { tags: ['test'] })
    @Get('/hello')
    async hello(@RequestUserAgent() userAgent: IResult): Promise<IResponse> {
        const newDate = this.helperDateService.create();

        return {
            _metadata: {
                customProperty: {
                    messageProperties: {
                        serviceName: this.serviceName,
                    },
                },
            },
            data: {
                userAgent,
                date: newDate,
                format: this.helperDateService.format(newDate),
                timestamp: this.helperDateService.timestamp(newDate),
            },
        };
    }

    @AppHelloApiKeyDoc()
    @Response('app.hello', { serialization: AppHelloSerialization })
    @Logger(ENUM_LOGGER_ACTION.TEST, { tags: ['test'] })
    @ApiKeyPublicProtected()
    @Get('/hello/api-key')
    async helloApiKey(
        @RequestUserAgent() userAgent: IResult
    ): Promise<IResponse> {
        const newDate = this.helperDateService.create();

        return {
            _metadata: {
                customProperty: {
                    messageProperties: {
                        serviceName: this.serviceName,
                    },
                },
            },
            data: {
                userAgent,
                date: newDate,
                format: this.helperDateService.format(newDate),
                timestamp: this.helperDateService.timestamp(newDate),
            },
        };
    }
}
