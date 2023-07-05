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
import { IAuthPassword } from '../../../common/auth/interfaces/auth.interface';
import { UserStatus } from '../constants/user.enum.constant';
import { randomBytes } from 'crypto';
import { HelperDateService } from '../../../common/helper/services/helper.date.service';
import { UserPayloadSerialization } from '../serializations/user.payload.serialization';
import { plainToInstance } from 'class-transformer';
import { UserResetPasswordDTO } from '../dtos/user.reset-password.dto';
import { AuthService } from '../../../common/auth/services/auth.service';

@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,
        private readonly helperDateService: HelperDateService,
        private readonly authService: AuthService
    ) {}

    async increasePasswordAttempt(user: UserEntity): Promise<void> {
        const passwordAttempt = user.passwordAttempt + 1;

        await this.userRepo.update(user.id, {
            passwordAttempt,
        });
    }

    async resetPasswordAttempt(user: UserEntity): Promise<void> {
        await this.userRepo.update(user.id, { passwordAttempt: 0 });
    }

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

    payloadSerialization(user: UserEntity): UserPayloadSerialization {
        return plainToInstance(UserPayloadSerialization, user);
    }

    async active(user: UserEntity) {
        await this.userRepo.update(user.id, {
            status: UserStatus.ACTIVE,
            activatedAt: this.helperDateService.create(),
            activeKey: '',
            activeExpire: null,
        });
    }

    async forgotPassword(user: UserEntity) {
        await this.userRepo.update(user.id, {
            forgotKey: randomBytes(32).toString('hex'),
            forgotExpire: this.helperDateService.forwardInMilliseconds(
                3 * 24 * 60 * 60
            ),
        });
    }

    async resetPassword(user: UserEntity, payload: UserResetPasswordDTO) {
        const passwordAuth = await this.authService.createPassword(
            payload.password
        );

        await this.userRepo.update(user.id, {
            forgotKey: '',
            forgotExpire: null,
            password: passwordAuth.passwordHash,
            blocked: false,
            salt: passwordAuth.salt,
            passwordExpired: passwordAuth.passwordExpired,
            passwordCreated: passwordAuth.passwordCreated,
            passwordAttempt: 0,
        });
    }
}
