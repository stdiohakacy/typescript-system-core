import { Inject, Injectable, mixin, Type } from '@nestjs/common';
import { PipeTransform, Scope } from '@nestjs/common/interfaces';
import { REQUEST } from '@nestjs/core';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { PaginationService } from '../services/postgres.pagination.service';

export function PaginationFilterInEnumPipe<T>(
    field: string,
    defaultValue: T,
    defaultEnum: Record<string, any>,
    raw: boolean
): Type<PipeTransform> {
    @Injectable({ scope: Scope.REQUEST })
    class MixinPaginationFilterInEnumPipe implements PipeTransform {
        constructor(
            @Inject(REQUEST) protected readonly request: IRequestApp,
            private readonly paginationService: PaginationService
        ) {}

        async transform(value: string) {
            let finalValue: T[] = defaultValue as T[];
            // if (value) {
            //     finalValue = value
            //         .split(',')
            //         .map((val: string) => defaultEnum[val])
            //         .filter((val: string) => val) as T[];
            // }

            // if (raw) {
            //     return {
            //         [field]: finalValue,
            //     };
            // }

            return this.paginationService.filterIn<T>(field, finalValue);
        }
    }

    return mixin(MixinPaginationFilterInEnumPipe);
}
