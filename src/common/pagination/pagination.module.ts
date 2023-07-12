import { Module } from '@nestjs/common';
import { PostgresPaginationModule } from './postgres/postgres.pagination.module';

@Module({
    imports: [PostgresPaginationModule],
    exports: [PostgresPaginationModule],
    providers: [],
    controllers: [],
})
export class PaginationModule {}
