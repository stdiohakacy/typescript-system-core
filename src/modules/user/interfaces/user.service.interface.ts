import { Uuid } from '../../../types';
import { UserRegisterDTO } from '../dtos/user.register.dto';
import { UserEntity } from '../entities/user.entity';
import { UserPayloadSerialization } from '../serializations/user.payload.serialization';
import { UserResetPasswordDTO } from '../dtos/user.reset-password.dto';
import { IAuthPassword } from '../../../modules/auth/interfaces/auth.interface';
import { UserUpdateProfileDTO } from '../dtos/user.update-profile.dto';
import { UserClaimUsernameDTO } from '../dtos/user.claim-username.dto';

export interface IUserService {
    create(
        payload: UserRegisterDTO,
        authPassword: IAuthPassword
    ): Promise<UserEntity>;

    findOneByUsername<T>(username: string): Promise<T>;

    findOneById(id: Uuid): Promise<UserEntity>;

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
}
