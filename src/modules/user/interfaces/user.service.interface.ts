import { Uuid } from '../../../types';
import { UserRegisterDTO } from '../dtos/user.register.dto';
import { UserEntity } from '../entities/user.entity';
import { UserPayloadSerialization } from '../serializations/user.payload.serialization';
import { UserResetPasswordDTO } from '../dtos/user.reset-password.dto';
import { IAuthPassword } from '../../../modules/auth/interfaces/auth.interface';

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
}
