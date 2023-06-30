import {
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { BaseDTO } from '../dto/base.dto';
import { Constructor } from 'src/types';

export interface IBaseEntity<DTO extends BaseDTO, O = never> {
    id: Uuid;
    createdAt: Date;
    updatedAt: Date;

    toDTO(options?: O): DTO;
}

export abstract class BaseEntity<DTO extends BaseDTO = BaseDTO, O = never>
    implements IBaseEntity<DTO, O>
{
    @PrimaryGeneratedColumn('uuid')
    id: Uuid;

    @CreateDateColumn({
        type: 'timestamp',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
    })
    updatedAt: Date;

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
