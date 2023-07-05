import { Column, Entity } from 'typeorm';
import {
    BaseEntity,
    IBaseEntity,
} from '../../../common/base/entity/base.entity';
import { UseDTO } from '../../../common/base/decorators/use-dto.decorator';
import { UserDTO } from '../dtos/user.dto';
import { UserStatus } from '../constants/user.enum.constant';

export interface IUserEntity extends IBaseEntity<UserDTO> {
    username: string;
    firstName: string;
    lastName: string;
    phone?: string;
    email: string;
    password: string;
    passwordExpired?: Date;
    passwordCreated?: Date;
    passwordAttempt?: number;
    salt: string;
    status: UserStatus;
    activeKey: string;
    activeExpire: Date;
    blocked?: boolean;
    blockedAt?: Date;
    activatedAt?: Date;
}

@Entity({ name: 'users' })
@UseDTO(UserDTO)
export class UserEntity extends BaseEntity<UserDTO> implements IUserEntity {
    @Column({ name: 'username', unique: true })
    username: string;

    @Column({ name: 'firstName' })
    firstName: string;

    @Column({ name: 'lastName' })
    lastName: string;

    @Column({ name: 'phone', unique: true, nullable: true })
    phone?: string;

    @Column({ name: 'email', unique: true })
    email: string;

    @Column({ name: 'password' })
    password: string;

    @Column({ name: 'passwordExpired', type: 'timestamptz', nullable: true })
    passwordExpired?: Date;

    @Column({ name: 'passwordCreated', type: 'timestamptz', nullable: true })
    passwordCreated?: Date;

    @Column({ name: 'passwordAttempt', nullable: true })
    passwordAttempt?: number;

    @Column({ name: 'salt' })
    salt: string;

    @Column({ name: 'blocked', nullable: true, default: false })
    blocked?: boolean;

    @Column({ name: 'blockedAt', type: 'timestamptz', nullable: true })
    blockedAt?: Date;

    @Column({ name: 'status', enum: UserStatus, default: UserStatus.INACTIVE })
    status: UserStatus;

    @Column({ name: 'activeKey', nullable: true })
    activeKey: string;

    @Column({ name: 'activeExpire', type: 'timestamptz', nullable: true })
    activeExpire: Date;

    @Column({ name: 'activatedAt', type: 'timestamptz', nullable: true })
    activatedAt: Date;

    @Column({ name: 'forgotKey', nullable: true })
    forgotKey: string;

    @Column({ name: 'forgotExpire', type: 'timestamptz', nullable: true })
    forgotExpire: Date;
}
