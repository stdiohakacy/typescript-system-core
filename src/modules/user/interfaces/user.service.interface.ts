import { Uuid } from '../../../types';
import { UserRegisterDTO } from '../dtos/user.register.dto';
import { UserEntity } from '../entities/user.entity';
import { UserPayloadSerialization } from '../serializations/user.payload.serialization';
import { UserResetPasswordDTO } from '../dtos/user.reset-password.dto';
import { UserUpdateProfileDTO } from '../dtos/user.update-profile.dto';
import { UserClaimUsernameDTO } from '../dtos/user.claim-username.dto';
import { AwsS3Serialization } from '../../../common/aws/serializations/aws.s3.serialization';
import { UserUpdateGoogleSSODTO } from '../dtos/user.update-google-sso.dto';
import { DeleteResult } from 'typeorm';
import { IAuthPassword } from '../../../common/authentication/interfaces/auth.interface';

export interface IUserService {
    deleteMany(find: Record<string, any>): Promise<DeleteResult>;

    create(
        payload: UserRegisterDTO,
        authPassword: IAuthPassword
    ): Promise<UserEntity>;

    findAll(find?: Record<string, any>): Promise<UserEntity[]>;

    findAllAndCount(
        find?: Record<string, any>
    ): Promise<[UserEntity[], number]>;

    findOneByUsername<T>(username: string): Promise<T>;

    findOneById(id: string): Promise<UserEntity>;

    increasePasswordAttempt(user: UserEntity): Promise<void>;

    resetPasswordAttempt(user: UserEntity): Promise<void>;

    payloadSerialization(user: UserEntity): UserPayloadSerialization;

    active(user: UserEntity): Promise<void>;

    forgotPassword(user: UserEntity): Promise<void>;

    resetPassword(
        user: UserEntity,
        payload: UserResetPasswordDTO
    ): Promise<void>;

    updatePassword(
        user: UserEntity,
        authPassword: IAuthPassword
    ): Promise<void>;

    updateProfile(
        user: UserEntity,
        payload: UserUpdateProfileDTO
    ): Promise<void>;

    updateUsername(user, payload: UserClaimUsernameDTO): Promise<void>;

    createPhotoFilename(): Promise<Record<string, any>>;

    updatePhoto(userAuth: UserEntity, photo: AwsS3Serialization): Promise<void>;

    findOneByEmail(email: string): Promise<UserEntity>;

    updateGoogleSSO(
        user: UserEntity,
        google: UserUpdateGoogleSSODTO
    ): Promise<void>;

    inactivePermanent(user: UserEntity): Promise<void>;
}
