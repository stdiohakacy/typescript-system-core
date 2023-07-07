import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { RouterModule as NestJsRouterModule } from '@nestjs/core';
import { RoutesAdminModule } from './routes/routes.admin.module';
import { AppController } from '../app/controllers/app.controller';
import { RoutesPublicModule } from './routes/route.public.module';
import { RoutesAuthModule } from './routes/route.auth.module';
import { RoutesUserModule } from './routes/route.user.module';

@Module({})
export class RouterModule {
    static forRoot(): DynamicModule {
        const imports: (
            | DynamicModule
            | Type<any>
            | Promise<DynamicModule>
            | ForwardReference<any>
        )[] = [];

        if (process.env.HTTP_ENABLE === 'true') {
            imports.push(
                RoutesPublicModule,
                RoutesAdminModule,
                RoutesAuthModule,
                RoutesUserModule,
                NestJsRouterModule.register([
                    {
                        path: '/public',
                        module: RoutesPublicModule,
                    },
                    {
                        path: '/admin',
                        module: RoutesAdminModule,
                    },
                    {
                        path: '/user',
                        module: RoutesUserModule,
                    },
                    {
                        path: '/auth',
                        module: RoutesAuthModule,
                    },
                ])
            );
        }

        return {
            module: RouterModule,
            providers: [],
            exports: [],
            controllers: [AppController],
            imports,
        };
    }
}
