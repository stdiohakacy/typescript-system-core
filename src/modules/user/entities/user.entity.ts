import { Column, Entity } from 'typeorm';
import {
    BaseEntity,
    IBaseEntity,
} from '../../../common/base/entity/base.entity';
import { UseDTO } from '../../../common/base/decorators/use-dto.decorator';
import { UserDTO } from '../dtos/user.dto';

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
    isActive: boolean;
    inactivePermanent: boolean;
    inactiveAt?: Date;
    blocked?: boolean;
    blockedAt?: Date;
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

    @Column({ name: 'isActive' })
    isActive: boolean;

    @Column({ name: 'inactivePermanent' })
    inactivePermanent: boolean;

    @Column({ name: 'inactiveAt', type: 'timestamptz', nullable: true })
    inactiveAt?: Date;

    @Column({ name: 'blocked', nullable: true })
    blocked?: boolean;

    @Column({ name: 'blockedAt', type: 'timestamptz', nullable: true })
    blockedAt?: Date;
}
