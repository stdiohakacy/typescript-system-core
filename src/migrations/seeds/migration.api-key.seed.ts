import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ApiKeyService } from '../../modules/api-key/services/api-key.service';
import { ENUM_API_KEY_TYPE } from '../../modules/api-key/constant/api-key.enum.constant';

@Injectable()
export class MigrationApiKeySeed {
    constructor(private readonly apiKeyService: ApiKeyService) {}

    @Command({ command: 'seed:apikey', describe: 'seeds apikeys' })
    async seeds(): Promise<void> {
        try {
            await this.apiKeyService.createRaw({
                name: 'Api Key Migration',
                type: ENUM_API_KEY_TYPE.PUBLIC,
                key: '2ihKDneb9jQGgidAOqfO',
                secret: 'ZLCtDd2rh3TAyVhfAeo3JOPvWfAsTp0Oq6rHl69D',
            });

            await this.apiKeyService.createRaw({
                name: 'Api Key Migration',
                type: ENUM_API_KEY_TYPE.PUBLIC,
                key: 'XL6kCmBw0ice0FszxVPc',
                secret: '6WhgBRZytEYcmFWmRQxxOMr8NRJnnmcHQUkSAHMn',
            });
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }

    @Command({
        command: 'remove:apikey',
        describe: 'remove apikeys',
    })
    async remove(): Promise<void> {
        try {
            // await this.apiKeyService.deleteMany({});
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }
}
