import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
    Doc,
    DocRequest,
    DocResponse,
} from '../../../common/doc/decorators/doc.decorator';
import { ENUM_DOC_REQUEST_BODY_TYPE } from '../../../common/doc/constants/doc.enum.constant';
import { UserLoginSerialization } from '../serializations/user.login.serialization';

export function UserPublicRegisterDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ operation: 'modules.public.user' }),
        DocRequest({ bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON }),
        DocResponse('user.signUp', { httpStatus: HttpStatus.CREATED })
    );
}

export function UserPublicLoginDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ operation: 'modules.public.user' }),
        DocRequest({ bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON }),
        DocResponse<UserLoginSerialization>('user.login', {
            serialization: UserLoginSerialization,
        })
    );
}

export function UserPublicActiveDoc(): MethodDecorator {
    return applyDecorators(
        Doc({ operation: 'modules.public.user' }),
        DocRequest({ bodyType: ENUM_DOC_REQUEST_BODY_TYPE.JSON }),
        DocResponse('user.active', { httpStatus: HttpStatus.OK })
    );
}
