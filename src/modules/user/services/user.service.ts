import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, SelectQueryBuilder } from 'typeorm';
import { randomBytes } from 'crypto';
import { plainToInstance } from 'class-transformer';
import { IUserService } from '../interfaces/user.service.interface';
import { UserRegisterDTO } from '../dtos/user.register.dto';
import { UserEntity } from '../entities/user.entity';
import { ENUM_USER_STATUS } from '../constants/user.enum.constant';
import { HelperDateService } from '../../../common/helper/services/helper.date.service';
import { UserPayloadSerialization } from '../serializations/user.payload.serialization';
import { UserResetPasswordDTO } from '../dtos/user.reset-password.dto';
import { Uuid } from '../../../types';
import { UserUpdateProfileDTO } from '../dtos/user.update-profile.dto';
import { UserClaimUsernameDTO } from '../dtos/user.claim-username.dto';
import { HelperStringService } from '../../../common/helper/services/helper.string.service';
import { AwsS3Serialization } from 'src/common/aws/serializations/aws.s3.serialization';
import { UserUpdateGoogleSSODTO } from '../dtos/user.update-google-sso.dto';
import { AuthService } from '../../../common/authentication/services/auth.service';
import { IAuthPassword } from '../../../common/authentication/interfaces/auth.interface';

@Injectable()
export class UserService implements IUserService {
    private readonly uploadPath: string;
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,
        private readonly helperDateService: HelperDateService,
        private readonly helperStringService: HelperStringService,
        private readonly authService: AuthService,
        private readonly configService: ConfigService
    ) {
        this.uploadPath = this.configService.get<string>('user.uploadPath');
    }

    async deleteMany(find: Record<string, any>): Promise<DeleteResult> {
        return await this.userRepo.delete(find);
    }

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

    async findOneById(id: Uuid): Promise<UserEntity> {
        return await this.userRepo.findOne({ where: { id } });
    }

    async create(
        payload: UserRegisterDTO,
        authPassword: IAuthPassword
    ): Promise<UserEntity> {
        const { email, username, firstName, lastName, phone, signUpFrom } =
            payload;
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
            status: ENUM_USER_STATUS.INACTIVE,
            activeKey: randomBytes(32).toString('hex'),
            activeExpire: this.helperDateService.forwardInMilliseconds(
                3 * 24 * 60 * 60
            ),
            signUpFrom,
        });

        return await this.userRepo.save(userEntity);
    }

    payloadSerialization(user: UserEntity): UserPayloadSerialization {
        return plainToInstance(UserPayloadSerialization, user);
    }

    async active(user: UserEntity) {
        await this.userRepo.update(user.id, {
            status: ENUM_USER_STATUS.ACTIVE,
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

    async updatePassword(user: UserEntity, authPassword: IAuthPassword) {
        const { passwordHash, passwordExpired, passwordCreated, salt } =
            authPassword;
        await this.userRepo.update(user.id, {
            password: passwordHash,
            passwordExpired,
            passwordCreated,
            salt,
        });
    }

    async updateProfile(user: UserEntity, payload: UserUpdateProfileDTO) {
        await this.userRepo.update(user.id, payload);
    }

    async updateUsername(user: UserEntity, payload: UserClaimUsernameDTO) {
        await this.userRepo.update(user.id, payload);
    }

    async createPhotoFilename(): Promise<Record<string, any>> {
        const fileName: string = this.helperStringService.random(20);

        return {
            path: this.uploadPath,
            filename: fileName,
        };
    }

    async updatePhoto(userAuth: UserEntity, photo: AwsS3Serialization) {
        await this.userRepo.update(userAuth.id, { photo });
    }

    async findOneByEmail(email: string): Promise<UserEntity> {
        return await this.userRepo.findOne({ where: { email } });
    }

    async updateGoogleSSO(
        user: UserEntity,
        google: UserUpdateGoogleSSODTO
    ): Promise<void> {
        await this.userRepo.update(user.id, { google });
    }

    async joinWithRole(): Promise<SelectQueryBuilder<UserEntity>> {
        return await this.userRepo
            .createQueryBuilder('users')
            .leftJoin('users.userRoles', 'userRoles')
            .leftJoin('userRoles.role', 'role')
            .leftJoin('role.rolePermissions', 'rolePermissions')
            .leftJoin('rolePermissions.permission', 'permission')
            .select([
                'users',
                'userRoles.id',
                'role.id',
                'role.name',
                'rolePermissions.id',
                'permission.id',
                'permission.name',
            ]);
    }

    async inactivePermanent(user: UserEntity) {
        await this.userRepo.update(user.id, {
            status: ENUM_USER_STATUS.INACTIVE,
            inactivePermanent: true,
            inactiveDate: this.helperDateService.create(),
        });
    }
}
