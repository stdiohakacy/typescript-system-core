import { Injectable } from '@nestjs/common';
import { IApiKeyService } from '../interfaces/api-key.service.interface';
import { HelperStringService } from 'src/common/helper/services/helper.string.service';
import { ConfigService } from '@nestjs/config';
import { HelperHashService } from 'src/common/helper/services/helper.hash.service';
import { HelperDateService } from 'src/common/helper/services/helper.date.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKeyEntity } from '../entities/api-key.entity';
import { IApiKeyCreated } from '../interfaces/api-key.interface';
import { ApiKeyCreateDTO } from '../dtos/api-key.create.dto';
import { ApiKeyCreateRawDTO } from '../dtos/api-key.create-raw.dto';

@Injectable()
export class ApiKeyService implements IApiKeyService {
    private readonly env: string;
    constructor(
        private readonly helperStringService: HelperStringService,
        private readonly configService: ConfigService,
        private readonly helperHashService: HelperHashService,
        private readonly helperDateService: HelperDateService,
        @InjectRepository(ApiKeyEntity)
        private apiKeyRepo: Repository<ApiKeyEntity>
    ) {
        this.env = this.configService.get<string>('app.env');
    }

    async validateHashApiKey(
        hashFromRequest: string,
        hash: string
    ): Promise<boolean> {
        return this.helperHashService.sha256Compare(hashFromRequest, hash);
    }

    findOneByActiveKey(key: string): Promise<any> {
        return this.apiKeyRepo.findOneBy({
            key,
            isActive: true,
        });
    }

    async createKey(): Promise<string> {
        return this.helperStringService.random(25, {
            safe: false,
            upperCase: true,
            prefix: `${this.env}_`,
        });
    }

    async createSecret(): Promise<string> {
        return this.helperStringService.random(35, {
            safe: false,
            upperCase: true,
        });
    }

    async createHashApiKey(key: string, secret: string): Promise<string> {
        return this.helperHashService.sha256(`${key}:${secret}`);
    }

    async create({
        name,
        type,
        startDate,
        endDate,
    }: ApiKeyCreateDTO): Promise<any> {
        const key = await this.createKey();
        const secret = await this.createSecret();
        const hash: string = await this.createHashApiKey(key, secret);

        const data = this.apiKeyRepo.create({
            name,
            key,
            hash,
            isActive: true,
            type,
        });

        if (startDate && endDate) {
            data.startDate = this.helperDateService.startOfDay(startDate);
            data.endDate = this.helperDateService.endOfDay(endDate);
        }

        const apiKeyCreated = await this.apiKeyRepo.save(data);
        return {
            secret,
            data: apiKeyCreated,
        } as IApiKeyCreated;
    }

    async createRaw({
        name,
        key,
        type,
        secret,
        startDate,
        endDate,
    }: ApiKeyCreateRawDTO): Promise<IApiKeyCreated> {
        const hash: string = await this.createHashApiKey(key, secret);

        const data = this.apiKeyRepo.create({
            name,
            key,
            hash,
            isActive: true,
            type,
        });

        if (startDate && endDate) {
            data.startDate = this.helperDateService.startOfDay(startDate);
            data.endDate = this.helperDateService.endOfDay(endDate);
        }

        const apiKeyCreated = await this.apiKeyRepo.save(data);

        return {
            secret,
            data: apiKeyCreated,
        } as IApiKeyCreated;
    }
}
