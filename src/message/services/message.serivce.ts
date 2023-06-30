import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MessageService {
    constructor(private readonly configService: ConfigService) {}
}
