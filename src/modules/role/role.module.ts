import { Module } from '@nestjs/common';
import { RoleService } from './services/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RoleEntity])],
    exports: [RoleService],
    providers: [RoleService],
    controllers: [],
})
export class RoleModule {}
