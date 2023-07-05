import { DynamicModule, Module, Provider } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthJwtAccessStrategy } from './guards/jwt-access/auth.jwt-access.strategy';
import { AuthJwtRefreshStrategy } from './guards/jwt-refresh/auth.jwt-refresh.strategy';

@Module({
    providers: [AuthService],
    exports: [AuthService],
    controllers: [],
    imports: [],
})
export class AuthModule {
    static forRoot(): DynamicModule {
        const providers: Provider<any>[] = [
            AuthJwtAccessStrategy,
            AuthJwtRefreshStrategy,
        ];

        if (
            process.env.SSO_GOOGLE_CLIENT_ID &&
            process.env.SSO_GOOGLE_CLIENT_SECRET
        ) {
            // providers.push(AuthGoogleOAuth2LoginStrategy);
            // providers.push(AuthGoogleOAuth2SignUpStrategy);
        }

        return {
            module: AuthModule,
            providers,
            exports: [],
            controllers: [],
            imports: [],
        };
    }
}
