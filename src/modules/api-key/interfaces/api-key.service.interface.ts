import { DeleteResult } from 'typeorm';
import { ApiKeyCreateDTO } from '../dtos/api-key.create.dto';

export interface IApiKeyService {
    create({ name, startDate, endDate }: ApiKeyCreateDTO): Promise<any>;
    findOneByActiveKey(key: string): Promise<any>;
    validateHashApiKey(hashFromRequest: string, hash: string): Promise<boolean>;
    deleteMany(find: Record<string, any>): Promise<DeleteResult>;
}
