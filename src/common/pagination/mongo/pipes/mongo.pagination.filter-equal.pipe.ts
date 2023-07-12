import { Inject, Injectable, mixin, Type } from '@nestjs/common';
import { PipeTransform, Scope } from '@nestjs/common/interfaces';
import { REQUEST } from '@nestjs/core';
import { IPaginationFilterStringEqualOptions } from '../interfaces/mongo.pagination.interface';
import { IRequestApp } from '../../../../common/request/interfaces/request.interface';
import { PaginationService } from '../services/mongo.pagination.service';
import { HelperNumberService } from '../../../../common/helper/services/helper.number.service';
import { ENUM_PAGINATION_FILTER_CASE_OPTIONS } from '../constants/mongo.pagination.enum.constant';

export function PaginationFilterEqualPipe(
    field: string,
    options?: IPaginationFilterStringEqualOptions
): Type<PipeTransform> {
    @Injectable({ scope: Scope.REQUEST })
    class MixinPaginationFilterEqualPipe implements PipeTransform {
        constructor(
            @Inject(REQUEST) protected readonly request: IRequestApp,
            private readonly paginationService: PaginationService,
            private readonly helperNumberService: HelperNumberService
        ) {}

        async transform(
            value: string
        ): Promise<Record<string, string | number>> {
            if (!value) {
                return undefined;
            }

            if (
                options?.case === ENUM_PAGINATION_FILTER_CASE_OPTIONS.UPPERCASE
            ) {
                value = value.toUpperCase();
            } else if (
                options?.case === ENUM_PAGINATION_FILTER_CASE_OPTIONS.LOWERCASE
            ) {
                value = value.toUpperCase();
            }

            if (options?.trim) {
                value = value.trim();
            }

            let finalValue: string | number = value;
            if (options?.isNumber) {
                finalValue = this.helperNumberService.check(value)
                    ? this.helperNumberService.create(value)
                    : value;
            }

            this.request.__filters = {
                ...this.request.__filters,
                [field]: finalValue,
            };

            return this.paginationService.filterEqual<string | number>(
                field,
                finalValue
            );
        }
    }

    return mixin(MixinPaginationFilterEqualPipe);
}
