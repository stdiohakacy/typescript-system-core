import { Injectable } from '@nestjs/common';
import { IMailService } from '../interfaces/mail.service.interface';
import { SendInBlueMailService } from '../services/send-in-blue.service.mail';
import { ENUM_MAIL_PROVIDER_TYPE } from '../constants/mail.enum.constant';

@Injectable()
export class MailServiceFactory {
    createService(serviceName: ENUM_MAIL_PROVIDER_TYPE): IMailService {
        switch (serviceName) {
            // case 'nodemailer':
            //     return new NodemailerService();
            // case 'mailgun':
            //     return new MailgunService();
            case ENUM_MAIL_PROVIDER_TYPE.SEND_IN_BLUE:
                return new SendInBlueMailService();
            default:
                throw new Error(`Unsupported email service: ${serviceName}`);
        }
    }
}
