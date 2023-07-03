import {
    Body,
    Controller,
    InternalServerErrorException,
    Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiKeyAdminCreateDoc } from '../docs/api-key.admin.doc';
import { Response } from '../../../common/response/decorators/response.decorator';
import { ApiKeyCreateSerialization } from '../serializations/api-key.create.serialization';
import { IResponse } from '../../../common/response/interfaces/response.interface';
import { ApiKeyService } from '../services/api-key.service';
import { IApiKeyCreated } from '../interfaces/api-key.interface';
import { ENUM_ERROR_STATUS_CODE_ERROR } from '../../../common/error/constants/error.status-code.constant';
import { ApiKeyCreateDTO } from '../dtos/api-key.create.dto';

@ApiTags('common.admin.apiKey')
@Controller({
    version: '1',
    path: '/api-key',
})
export class ApiKeyAdminController {
    constructor(private readonly apiKeyService: ApiKeyService) {}

    @ApiKeyAdminCreateDoc()
    @Response('apiKey.create', { serialization: ApiKeyCreateSerialization })
    // @PolicyAbilityProtected({
    //     subject: ENUM_POLICY_SUBJECT.API_KEY,
    //     action: [ENUM_POLICY_ACTION.READ, ENUM_POLICY_ACTION.CREATE],
    // })
    // @AuthJwtAdminAccessProtected()
    // @ApiKeyPublicProtected()
    @Post('/create')
    async create(@Body() body: ApiKeyCreateDTO): Promise<IResponse> {
        try {
            const apiKeyCreated: IApiKeyCreated =
                await this.apiKeyService.create(body);

            return {
                data: {
                    id: apiKeyCreated.data.id,
                    secret: apiKeyCreated.secret,
                },
            };
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                _error: err.message,
            });
        }
    }
}
