import { Module } from '@nestjs/common';
import { MailServiceFactory } from './factory/mail.factory.service';

@Module({
    imports: [],
    exports: [MailServiceFactory],
    providers: [MailServiceFactory],
    controllers: [],
})
export class MailModule {}
