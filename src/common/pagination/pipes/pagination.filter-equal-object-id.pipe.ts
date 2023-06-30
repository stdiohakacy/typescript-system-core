import { Inject, Injectable, mixin, Type } from '@nestjs/common';
import { PipeTransform, Scope } from '@nestjs/common/interfaces';
import { REQUEST } from '@nestjs/core';
import { isUUID } from 'class-validator';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';

export function PaginationFilterEqualObjectIdPipe(
    field: string
): Type<PipeTransform> {
    @Injectable({ scope: Scope.REQUEST })
    class MixinPaginationFilterEqualObjectIdPipe implements PipeTransform {
        constructor(
            @Inject(REQUEST) protected readonly request: IRequestApp,
            private readonly paginationService: PaginationService
        ) {}

        async transform(value: string): Promise<Record<string, string>> {
            if (!value) {
                return undefined;
            }

            value = value.trim();
            const finalValue = isUUID(value) ? value : value;

            this.request.__filters = {
                ...this.request.__filters,
                [field]: value,
            };

            return this.paginationService.filterEqual<string>(
                field,
                finalValue
            );
        }
    }

    return mixin(MixinPaginationFilterEqualObjectIdPipe);
}
