import { registerAs } from '@nestjs/config';

export default registerAs(
    'mail',
    (): Record<string, any> => ({
        sendInBlue: {
            apiKey: process.env.SENDINBLUE_API_KEY,
            senderName: 'Typescript core system application',
            senderEmail: 'typescript-core-system@gmail.com',
        },
        provider: 'SEND_IN_BLUE',
    })
);
