import { ApiKeyEntity } from '../entities/api-key.entity';

export interface IApiKeyCreated {
    secret: string;
    data: ApiKeyEntity;
}
