import { Query } from '@nestjs/common';
import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from '../constants/mongo.pagination.enum.constant';
import { PaginationSearchPipe } from '../pipes/mongo.pagination.search.pipe';
import { PaginationPagingPipe } from '../pipes/mongo.pagination.paging.pipe';
import { PaginationOrderPipe } from '../pipes/mongo.pagination.order.pipe';
import { PaginationFilterInBooleanPipe } from '../pipes/mongo.pagination.filter-in-boolean.pipe';
import {
    IPaginationFilterDateOptions,
    IPaginationFilterStringContainOptions,
    IPaginationFilterStringEqualOptions,
} from '../interfaces/mongo.pagination.interface';
import { PaginationFilterEqualPipe } from '../pipes/mongo.pagination.filter-equal.pipe';
import { PaginationFilterContainPipe } from '../pipes/mongo.pagination.filter-contain.pipe';
import { PaginationFilterDatePipe } from '../pipes/mongo.pagination.filter-date.pipe';
import { PaginationFilterEqualObjectIdPipe } from '../pipes/mongo.pagination.filter-equal-object-id.pipe';
import { PaginationFilterInEnumPipe } from '../pipes/mongo.pagination.filter-in-enum.pipe';

export function PaginationQuery(
    defaultPerPage: number,
    defaultOrderBy: string,
    defaultOrderDirection: ENUM_PAGINATION_ORDER_DIRECTION_TYPE,
    availableSearch: string[],
    availableOrderBy: string[]
): ParameterDecorator {
    return Query(
        PaginationSearchPipe(availableSearch),
        PaginationPagingPipe(defaultPerPage),
        PaginationOrderPipe(
            defaultOrderBy,
            defaultOrderDirection,
            availableOrderBy
        )
    );
}

export function PaginationQuerySearch(
    availableSearch: string[]
): ParameterDecorator {
    return Query(PaginationSearchPipe(availableSearch));
}

export function PaginationQueryFilterInBoolean(
    field: string,
    defaultValue: boolean[],
    queryField?: string
): ParameterDecorator {
    return Query(
        queryField ?? field,
        PaginationFilterInBooleanPipe(field, defaultValue)
    );
}

export function PaginationQueryFilterInEnum<T>(
    field: string,
    defaultValue: T,
    defaultEnum: Record<string, any>,
    queryField?: string
): ParameterDecorator {
    return Query(
        queryField ?? field,
        PaginationFilterInEnumPipe<T>(field, defaultValue, defaultEnum)
    );
}

export function PaginationQueryFilterEqual(
    field: string,
    queryField?: string,
    options?: IPaginationFilterStringEqualOptions
): ParameterDecorator {
    return Query(
        queryField ?? field,
        PaginationFilterEqualPipe(field, options)
    );
}

export function PaginationQueryFilterContain(
    field: string,
    queryField?: string,
    options?: IPaginationFilterStringContainOptions
): ParameterDecorator {
    return Query(
        queryField ?? field,
        PaginationFilterContainPipe(field, options)
    );
}

export function PaginationQueryFilterDate(
    field: string,
    queryField?: string,
    options?: IPaginationFilterDateOptions
): ParameterDecorator {
    return Query(queryField ?? field, PaginationFilterDatePipe(field, options));
}

export function PaginationQueryFilterEqualObjectId(
    field: string,
    queryField?: string
): ParameterDecorator {
    return Query(queryField ?? field, PaginationFilterEqualObjectIdPipe(field));
}
