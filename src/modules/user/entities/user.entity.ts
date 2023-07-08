import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import {
    BaseEntity,
    IBaseEntity,
} from '../../../common/base/entity/base.entity';
import { UseDTO } from '../../../common/base/decorators/use-dto.decorator';
import { UserDTO } from '../dtos/user.dto';
import {
    ENUM_PERMISSION_TYPE,
    ENUM_ROLE_TYPE,
    ENUM_USER_SIGN_UP_FROM,
    ENUM_USER_STATUS,
} from '../constants/user.enum.constant';
import { AwsS3Serialization } from '../../../common/aws/serializations/aws.s3.serialization';
import { IUserGoogleEntity } from '../interfaces/user.interface';
import { RoleEntity } from 'src/modules/role/entities/role.entity';
import { UserRoleEntity } from './user-role.entity';

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
    status: ENUM_USER_STATUS;
    activeKey: string;
    activeExpire: Date;
    blocked?: boolean;
    blockedAt?: Date;
    activatedAt?: Date;
    forgotKey?: string;
    forgotExpire?: Date;
    photo?: AwsS3Serialization;
    inactivePermanent?: boolean;
    inactiveDate?: Date;
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

    @Column({
        name: 'status',
        enum: ENUM_USER_STATUS,
        default: ENUM_USER_STATUS.INACTIVE,
    })
    status: ENUM_USER_STATUS;

    @Column({ name: 'activeKey', nullable: true })
    activeKey: string;

    @Column({ name: 'activeExpire', type: 'timestamptz', nullable: true })
    activeExpire: Date;

    @Column({ name: 'activatedAt', type: 'timestamptz', nullable: true })
    activatedAt: Date;

    @Column({ name: 'forgotKey', nullable: true })
    forgotKey?: string;

    @Column({ name: 'forgotExpire', type: 'timestamptz', nullable: true })
    forgotExpire?: Date;

    @Column({ name: 'photo', type: 'jsonb', nullable: true })
    photo?: AwsS3Serialization;

    @Column({
        name: 'signUpFrom',
        enum: ENUM_USER_SIGN_UP_FROM,
        default: ENUM_USER_SIGN_UP_FROM.LOCAL,
    })
    signUpFrom: ENUM_USER_SIGN_UP_FROM;

    @Column({
        name: 'google',
        type: 'jsonb',
        nullable: true,
    })
    google?: IUserGoogleEntity;

    @Column({
        name: 'inactivePermanent',
        nullable: true,
    })
    inactivePermanent?: boolean;

    @Column({
        name: 'inactiveDate',
        nullable: true,
        type: 'timestamptz',
    })
    inactiveDate?: Date;

    /* Relationships */

    @OneToMany(() => UserRoleEntity, (userRoles) => userRoles.user)
    userRoles?: UserRoleEntity[];
}
