import { Query } from '@nestjs/common';
import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from '../constants/postgres.pagination.enum.constant';
import { PaginationSearchPipe } from '../pipes/postgres.pagination.search.pipe';
import { PaginationPagingPipe } from '../pipes/postgres.pagination.paging.pipe';
import { PaginationOrderPipe } from '../pipes/postgres.pagination.order.pipe';
import { PaginationFilterInEnumPipe } from '../pipes/postgres.pagination.filter-in-enum.pipe';
import { PaginationFilterInBooleanPipe } from '../pipes/postgres.pagination.filter-in-boolean.pipe';

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

export function PaginationQueryFilterInEnum<T>(
    field: string,
    defaultValue: T,
    defaultEnum: Record<string, any>,
    queryField?: string,
    raw = false
): ParameterDecorator {
    return Query(
        queryField ?? field,
        PaginationFilterInEnumPipe<T>(field, defaultValue, defaultEnum, raw)
    );
}

export function PaginationQueryFilterInBoolean(
    field: string,
    defaultValue: boolean[],
    queryField?: string,
    raw = false
): ParameterDecorator {
    return Query(
        queryField ?? field,
        PaginationFilterInBooleanPipe(field, defaultValue, raw)
    );
}
