import { IAuthPassword } from '../../../common/auth/interfaces/auth.interface';
import { UserRegisterDTO } from '../dtos/user.register.dto';
import { UserEntity } from '../entities/user.entity';
import { UserPayloadSerialization } from '../serializations/user.payload.serialization';

export interface IUserService {
    create(
        payload: UserRegisterDTO,
        authPassword: IAuthPassword
    ): Promise<UserEntity>;

    findOneByUsername<T>(username: string): Promise<T>;
    increasePasswordAttempt(user: UserEntity): Promise<void>;
    resetPasswordAttempt(user: UserEntity): Promise<void>;
    payloadSerialization(user: UserEntity): UserPayloadSerialization;
}
