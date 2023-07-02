import { applyDecorators } from '@nestjs/common';
import { AppHelloSerialization } from '../../app/serializations/app.hello.serialization';
import { Doc } from '../../common/doc/decorators/doc.decorator';

export function AppHelloDoc(): MethodDecorator {
    return applyDecorators(
        Doc<AppHelloSerialization>('app.hello', {
            response: { serialization: AppHelloSerialization },
        })
    );
}

export function AppHelloApiKeyDoc(): MethodDecorator {
    return applyDecorators(
        Doc<AppHelloSerialization>('app.helloApiKey', {
            auth: { apiKey: true },
            requestHeader: { timestamp: true, userAgent: true },
            response: { serialization: AppHelloSerialization },
        })
    );
}
