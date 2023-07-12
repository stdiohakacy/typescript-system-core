import { Injectable } from '@nestjs/common';
import { FindManyOptions, FindOperator, FindOptionsOrder, In } from 'typeorm';
import { IPaginationService } from '../interfaces/postgres.pagination.service.interface';
import { PAGINATION_AVAILABLE_ORDER_BY } from '../constants/postgres.pagination.constant';
import { IPaginationOrder } from '../interfaces/postgres.pagination.interface';
import { ENUM_PAGINATION_ORDER_DIRECTION_TYPE } from '../constants/postgres.pagination.enum.constant';

@Injectable()
export class PaginationService implements IPaginationService {
    offset(page: number, perPage: number): number {
        const offset: number = (page - 1) * perPage;
        return offset;
    }

    totalPage(totalData: number, perPage: number): number {
        const totalPage = Math.ceil(totalData / perPage);
        return totalPage;
    }

    offsetWithoutMax(page: number, perPage: number): number {
        const offset: number = (page - 1) * perPage;
        return offset;
    }

    totalPageWithoutMax(totalData: number, perPage: number): number {
        const totalPage = Math.ceil(totalData / perPage);
        return totalPage;
    }

    page(page?: number): number {
        return page || 1;
    }

    perPage(perPage?: number): number {
        return perPage || 10;
    }

    order(
        orderByValue = 'id',
        orderDirectionValue:
            | ENUM_PAGINATION_ORDER_DIRECTION_TYPE.ASC
            | ENUM_PAGINATION_ORDER_DIRECTION_TYPE.DESC,
        availableOrderBy = PAGINATION_AVAILABLE_ORDER_BY
    ): IPaginationOrder {
        const orderBy: string = availableOrderBy.includes(orderByValue)
            ? orderByValue
            : 'id';

        return { [orderBy]: orderDirectionValue };
    }

    search(
        searchValue = '',
        availableSearch: string[]
    ): Record<string, any> | undefined {
        if (!searchValue) {
            return undefined;
        }

        const searchCondition = availableSearch.map((val) => ({
            [val]: {
                $iLike: `%${searchValue}%`,
            },
        }));

        return {
            $or: searchCondition,
        };
    }

    filterEqual<T = string>(field: string, filterValue: T): Record<string, T> {
        return { [field]: filterValue };
    }

    filterContain(
        field: string,
        filterValue: string
    ): Record<string, { $iLike: string }> {
        return {
            [field]: {
                $iLike: `%${filterValue}%`,
            },
        };
    }

    filterContainFullMatch(
        field: string,
        filterValue: string
    ): Record<string, { $iLike: string }> {
        return {
            [field]: {
                $iLike: filterValue,
            },
        };
    }

    filterIn<T = string>(
        field: string,
        filterValue: T[]
    ): {
        [x: string]: FindOperator<any>;
    } {
        return {
            [field]: In(filterValue),
        };
    }

    filterDate(field: string, filterValue: Date): Record<string, Date> {
        return {
            [field]: filterValue,
        };
    }

    createFindManyOptions<T>(
        page: number,
        perPage: number,
        orderByValue: string,
        orderDirectionValue:
            | ENUM_PAGINATION_ORDER_DIRECTION_TYPE.ASC
            | ENUM_PAGINATION_ORDER_DIRECTION_TYPE.DESC,
        searchValue: string,
        availableSearch: string[]
    ): FindManyOptions<T> {
        const findManyOptions: FindManyOptions<T> = {
            skip: this.offset(page, perPage),
            take: perPage,
            order: {
                [orderByValue]: orderDirectionValue,
            } as FindOptionsOrder<T>,
            where: this.search(searchValue, availableSearch),
        };
        return findManyOptions;
    }
}
