import { HttpStatus } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { ENUM_HELPER_FILE_TYPE } from '../../helper/constants/helper.enum.constant';
import { IHelperFileRows } from '../../helper/interfaces/helper.interface';
import { IMessageOptionsProperties } from '../../message/interface/message.interface';

export interface IResponseCustomPropertyMetadata {
    statusCode?: number;
    message?: string;
    httpStatus?: HttpStatus;
    messageProperties?: IMessageOptionsProperties;
}

// metadata
export interface IResponseMetadata {
    customProperty?: IResponseCustomPropertyMetadata;
    [key: string]: any;
}

// decorator options

export interface IResponseOptions<T> {
    serialization?: ClassConstructor<T>;
    messageProperties?: IMessageOptionsProperties;
}

export type IResponsePagingOptions<T> = IResponseOptions<T>;

export interface IResponseExcelOptions<T> extends IResponseOptions<T> {
    fileType?: ENUM_HELPER_FILE_TYPE;
}

// type
export interface IResponse {
    _metadata?: IResponseMetadata;
    data?: Record<string, any>;
}

export interface IResponsePagingPagination {
    totalPage: number;
    total: number;
}

export interface IResponsePaging {
    _metadata?: IResponseMetadata;
    _pagination: IResponsePagingPagination;
    data: Record<string, any>[];
}

export interface IResponseExcel {
    data: IHelperFileRows[];
}

export interface IResponseFile {
    data: IHelperFileRows[];
}

export interface IResponseFileOptions<T> extends IResponseOptions<T> {
    fileType?: ENUM_HELPER_FILE_TYPE;
}
