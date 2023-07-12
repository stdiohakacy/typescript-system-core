import { FindManyOptions, FindOperator } from 'typeorm';
import { IPaginationOrder } from './postgres.pagination.interface';
import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from '../constants/postgres.pagination.enum.constant';

export interface IPaginationService {
    offset(page: number, perPage: number): number;

    totalPage(totalData: number, perPage: number): number;

    offsetWithoutMax(page: number, perPage: number): number;

    totalPageWithoutMax(totalData: number, perPage: number): number;

    page(page?: number): number;

    perPage(perPage?: number): number;

    order(
        orderByValue: string,
        orderDirectionValue:
            | ENUM_PAGINATION_ORDER_DIRECTION_TYPE.ASC
            | ENUM_PAGINATION_ORDER_DIRECTION_TYPE.DESC,
        availableOrderBy?: string[]
    ): IPaginationOrder;

    search(
        searchValue?: string,
        availableSearch?: string[]
    ): Record<string, any> | undefined;

    filterEqual<T = string>(field: string, filterValue: T): Record<string, T>;

    filterContain(
        field: string,
        filterValue: string
    ): Record<string, { $iLike: string }>;

    filterContainFullMatch(
        field: string,
        filterValue: string
    ): Record<string, { $iLike: string }>;

    filterIn<T = string>(
        field: string,
        filterValue: T[]
    ): {
        [x: string]: FindOperator<any>;
    };

    filterDate(field: string, filterValue: Date): Record<string, Date>;

    createFindManyOptions<T>(
        page: number,
        perPage: number,
        orderByValue: string,
        orderDirectionValue:
            | ENUM_PAGINATION_ORDER_DIRECTION_TYPE.ASC
            | ENUM_PAGINATION_ORDER_DIRECTION_TYPE.DESC,
        searchValue: string,
        availableSearch: string[]
    ): FindManyOptions<T>;
}
