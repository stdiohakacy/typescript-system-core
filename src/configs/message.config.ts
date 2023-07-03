import { registerAs } from '@nestjs/config';
import { APP_LANGUAGE } from '../app/constants/app.constant';

export default registerAs(
    'message',
    (): Record<string, any> => ({
        availableLanguage: Object.values([]),
        language: process.env.APP_LANGUAGE ?? APP_LANGUAGE,
    })
);
