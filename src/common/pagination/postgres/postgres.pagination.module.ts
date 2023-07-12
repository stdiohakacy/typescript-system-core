import { Module } from '@nestjs/common';
import { PaginationService } from './services/postgres.pagination.service';

@Module({
    imports: [],
    exports: [PaginationService],
    providers: [PaginationService],
    controllers: [],
})
export class PostgresPaginationModule {}
