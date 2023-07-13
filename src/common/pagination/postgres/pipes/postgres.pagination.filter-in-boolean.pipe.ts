import { Inject, Injectable, mixin, Type } from '@nestjs/common';
import { PipeTransform, Scope } from '@nestjs/common/interfaces';
import { REQUEST } from '@nestjs/core';
import { HelperArrayService } from '../../../../common/helper/services/helper.array.service';
import { IRequestApp } from '../../../../common/request/interfaces/request.interface';
import { PaginationService } from '../services/postgres.pagination.service';

export function PaginationFilterInBooleanPipe(
    field: string,
    defaultValue: boolean[],
    raw: boolean
): Type<PipeTransform> {
    @Injectable({ scope: Scope.REQUEST })
    class MixinPaginationFilterInBooleanPipe implements PipeTransform {
        constructor(
            @Inject(REQUEST) protected readonly request: IRequestApp,
            private readonly paginationService: PaginationService,
            private readonly helperArrayService: HelperArrayService
        ) {}

        async transform(value: string) {
            let finalValue: boolean[] = defaultValue as boolean[];

            if (value) {
                finalValue = this.helperArrayService.unique(
                    value.split(',').map((val: string) => val === 'true')
                );
            }

            if (raw) {
                return {
                    [field]: finalValue,
                };
            }

            return this.paginationService.filterIn<boolean>(field, finalValue);
        }
    }

    return mixin(MixinPaginationFilterInBooleanPipe);
}
