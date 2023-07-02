import { OmitType } from '@nestjs/swagger';
import { ApiKeyDTO } from './api-key.dto';

export class ApiKeyCreateDTO extends OmitType(ApiKeyDTO, [
    'createdAt',
    'updatedAt',
    'id',
]) {}
