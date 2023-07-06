import {
    CompletedPart,
    HeadBucketCommandOutput,
    UploadPartRequest,
} from '@aws-sdk/client-s3';
import { AwsS3Serialization } from '../serializations/aws.s3.serialization';
import { Readable } from 'stream';
import { IAwsS3PutItemOptions } from '../../../../../common/aws/interfaces/aws.interface';
import {
    AwsS3MultipartPartsSerialization,
    AwsS3MultipartSerialization,
} from '../../../../../common/aws/serializations/aws.s3-multipart.serialization';

export interface IAwsS3Service {
    checkBucketExistence(): Promise<HeadBucketCommandOutput>;
    listBucket(): Promise<string[]>;
    listItemInBucket(prefix?: string): Promise<AwsS3Serialization[]>;
    getItemInBucket(
        fileName: string,
        path?: string
    ): Promise<Readable | ReadableStream<any> | Blob>;
    putItemInBucket(
        filename: string,
        content:
            | string
            | Uint8Array
            | Buffer
            | Readable
            | ReadableStream
            | Blob,
        options?: IAwsS3PutItemOptions
    ): Promise<AwsS3Serialization>;
    deleteItemInBucket(fileName: string): Promise<void>;
    deleteItemsInBucket(fileNames: string[]): Promise<void>;
    deleteFolder(dir: string): Promise<void>;
    createMultiPart(
        fileName: string,
        options?: IAwsS3PutItemOptions
    ): Promise<AwsS3MultipartSerialization>;
    uploadPart(
        path: string,
        content: UploadPartRequest['Body'] | string | Uint8Array | Buffer,
        uploadId: string,
        partNumber: number
    ): Promise<AwsS3MultipartPartsSerialization>;
    completeMultipart(
        path: string,
        uploadId: string,
        parts: CompletedPart[]
    ): Promise<void>;
    abortMultipart(path: string, uploadId: string): Promise<void>;
}
