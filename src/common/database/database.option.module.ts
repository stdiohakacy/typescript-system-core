import { Module } from '@nestjs/common';
import { DatabaseOptionsService } from './service/database.options-service.service';

@Module({
  providers: [DatabaseOptionsService],
  exports: [DatabaseOptionsService],
  imports: [],
  controllers: [],
})
export class DatabaseOptionsModule {}
