import { Inject, Injectable, mixin, Type } from '@nestjs/common';
import { PipeTransform, Scope } from '@nestjs/common/interfaces';
import { REQUEST } from '@nestjs/core';
import { IPaginationFilterStringContainOptions } from '../interfaces/mongo.pagination.interface';
import { IRequestApp } from '../../../../common/request/interfaces/request.interface';
import { PaginationService } from '../services/mongo.pagination.service';
import { ENUM_PAGINATION_FILTER_CASE_OPTIONS } from '../constants/mongo.pagination.enum.constant';

export function PaginationFilterContainPipe(
    field: string,
    options?: IPaginationFilterStringContainOptions
): Type<PipeTransform> {
    @Injectable({ scope: Scope.REQUEST })
    class MixinPaginationFilterContainPipe implements PipeTransform {
        constructor(
            @Inject(REQUEST) protected readonly request: IRequestApp,
            private readonly paginationService: PaginationService
        ) {}

        async transform(
            value: string
        ): Promise<Record<string, { $regex: RegExp; $options: string }>> {
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

            if (options?.fullMatch) {
                return this.paginationService.filterContainFullMatch(
                    field,
                    value
                );
            }

            this.request.__filters = {
                ...this.request.__filters,
                [field]: value,
            };

            return this.paginationService.filterContain(field, value);
        }
    }

    return mixin(MixinPaginationFilterContainPipe);
}
