import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { IUserService } from '../interfaces/user.service.interface';
import { UserRegisterDTO } from '../dtos/user.register.dto';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';
import { AuthService } from '../../../common/auth/services/auth.service';
import { ENUM_ERROR_STATUS_CODE_ERROR } from '../../../common/error/constants/error.status-code.constant';
import { IAuthPassword } from '../../../common/auth/interfaces/auth.interface';

@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>
    ) {}

    async create(
        { email, username, firstName, lastName, phone }: UserRegisterDTO,
        { passwordExpired, passwordHash, salt, passwordCreated }: IAuthPassword
    ): Promise<UserEntity> {
        const userEntity = this.userRepo.create({
            username,
            firstName,
            lastName,
            email,
            password: passwordHash,
            isActive: true,
            inactivePermanent: false,
            blocked: false,
            salt,
            passwordExpired,
            passwordCreated,
            passwordAttempt: 0,
            phone,
        });

        return await this.userRepo.save(userEntity);
    }
}
