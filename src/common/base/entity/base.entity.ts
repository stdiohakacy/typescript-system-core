import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { BaseDTO } from '../dto/base.dto';
import { Constructor, Uuid } from '../../../types';

export interface IBaseEntity<DTO extends BaseDTO, O = never> {
    id: Uuid;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    createdBy: Uuid;
    updatedBy: Uuid;
    deletedBy: Uuid;

    toDTO(options?: O): DTO;
}

export abstract class BaseEntity<DTO extends BaseDTO = BaseDTO, O = never>
    implements IBaseEntity<DTO, O>
{
    @PrimaryGeneratedColumn('uuid')
    id: Uuid;

    @CreateDateColumn({ type: 'timestamp', name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updatedAt', nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', name: 'deletedAt', nullable: true })
    deletedAt: Date;

    @Column({ type: 'uuid', name: 'createdBy', nullable: true })
    createdBy: Uuid;

    @Column({ type: 'uuid', name: 'updatedBy', nullable: true })
    updatedBy: Uuid;

    @Column({ type: 'uuid', name: 'deletedBy', nullable: true })
    deletedBy: Uuid;

    private dtoClass?: Constructor<DTO, [BaseEntity, O?]>;

    toDTO(options?: O): DTO {
        const dtoClass = this.dtoClass;

        if (!dtoClass) {
            throw new Error(
                `You need to use @UseDTO on class (${this.constructor.name}) be able to call toDTO function`
            );
        }

        return new dtoClass(this, options);
    }
}
