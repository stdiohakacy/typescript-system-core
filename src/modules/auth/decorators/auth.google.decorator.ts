import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGoogleOauth2SignUpGuard } from '../guards/google-oauth2/auth.google-oauth2.sign-up.strategy';

export function AuthGoogleOAuth2SignUpProtected(): MethodDecorator {
    return applyDecorators(UseGuards(AuthGoogleOauth2SignUpGuard));
}
