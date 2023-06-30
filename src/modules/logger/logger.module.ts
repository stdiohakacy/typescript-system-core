import { Global, Module } from '@nestjs/common';
import { LoggerService } from './services/logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerEntity } from './repository/entities/logger.entity';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([LoggerEntity])],
    providers: [LoggerService],
    exports: [LoggerService],
})
export class LoggerModule {}
