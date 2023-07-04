import { IMailService } from './../interfaces/mail.service.interface';
import { Injectable } from '@nestjs/common';
import sibApiV3Sdk from 'sib-api-v3-sdk';

@Injectable()
export class SendInBlueMailService implements IMailService {
    constructor() {}
    async sendEmail(to: string, subject: string, body: string) {
        sibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey =
            process.env.SENDINBLUE_API_KEY;

        new sibApiV3Sdk.TransactionalEmailsApi()
            .sendTransacEmail({
                sender: {
                    email: 'sendinblue@sendinblue.com',
                    name: 'Sendinblue',
                },
                subject: 'This is my default subject line',
                templateId: 27,
                params: {
                    greeting: 'This is the default greeting',
                    headline: 'This is the default headline',
                },
                messageVersions: [
                    {
                        to: [
                            {
                                email: 'elasticsearch22101995@gmail.com',
                                name: 'Bob Anderson',
                            },
                        ],
                        params: {
                            greeting: 'Hello again!',
                            headline:
                                'Take advantage of our summer deals, taylored just for you',
                        },
                        subject: 'Some deals worth to be looked at!',
                    },
                ],
            })
            .then(
                function (data) {
                    console.log(data);
                },
                function (error) {
                    console.error(error);
                }
            );
    }
}
