import { HttpStatus, applyDecorators } from '@nestjs/common';
import { Doc } from 'src/common/doc/decorators/doc.decorator';

export function UserPublicRegisterDoc(): MethodDecorator {
    return applyDecorators(
        Doc('user.register', {
            auth: { jwtAccessToken: false },
            response: { httpStatus: HttpStatus.CREATED },
        })
    );
}
