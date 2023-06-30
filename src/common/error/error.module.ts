import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { DebuggerModule } from 'src/common/debugger/debugger.module';

@Module({
    controllers: [],
    providers: [],
    imports: [DebuggerModule.forRoot()],
})
export class ErrorModule {}
