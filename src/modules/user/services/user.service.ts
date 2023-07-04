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
import { UserStatus } from '../constants/user.enum.constant';
import { randomBytes } from 'crypto';
import { HelperDateService } from 'src/common/helper/services/helper.date.service';

@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,
        private readonly helperDateService: HelperDateService
    ) {}

    async findOneByUsername<T>(username: string): Promise<T> {
        return <T>this.userRepo.findOne({ where: { username } });
    }

    async create(
        payload: UserRegisterDTO,
        authPassword: IAuthPassword
    ): Promise<UserEntity> {
        const { email, username, firstName, lastName, phone } = payload;
        const { passwordExpired, passwordHash, salt, passwordCreated } =
            authPassword;

        const userEntity = this.userRepo.create({
            email,
            username,
            firstName,
            lastName,
            phone,
            password: passwordHash,
            blocked: false,
            salt,
            passwordExpired,
            passwordCreated,
            passwordAttempt: 0,
            status: UserStatus.INACTIVE,
            activeKey: randomBytes(32).toString('hex'),
            activeExpire: this.helperDateService.forwardInMilliseconds(
                3 * 24 * 60 * 60
            ),
        });

        return await this.userRepo.save(userEntity);
    }
}
