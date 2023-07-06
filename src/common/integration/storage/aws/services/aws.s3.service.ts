import { Injectable } from '@nestjs/common';
import { IAwsS3Service } from '../interfaces/aws.s3.service.interface';
import {
    HeadBucketCommandOutput,
    CompletedPart,
    S3Client,
    HeadBucketCommand,
    ListBucketsCommand,
    Bucket,
    ListObjectsV2Command,
    _Object,
    GetObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand,
    DeleteObjectsCommand,
    CreateMultipartUploadCommand,
    UploadPartCommand,
    CompleteMultipartUploadCommand,
    AbortMultipartUploadCommand,
} from '@aws-sdk/client-s3';
import { IAwsS3PutItemOptions } from '../../../../../common/aws/interfaces/aws.interface';
import {
    AwsS3MultipartSerialization,
    AwsS3MultipartPartsSerialization,
} from '../../../../../common/aws/serializations/aws.s3-multipart.serialization';
import { Readable } from 'stream';
import { AwsS3Serialization } from '../serializations/aws.s3.serialization';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsS3Service implements IAwsS3Service {
    private readonly s3Client: S3Client;
    private readonly bucket: string;
    private readonly baseUrl: string;

    constructor(private readonly configService: ConfigService) {
        this.s3Client = new S3Client({
            credentials: {
                accessKeyId:
                    this.configService.get<string>('aws.credential.key'),
                secretAccessKey: this.configService.get<string>(
                    'aws.credential.secret'
                ),
            },
            region: this.configService.get<string>('aws.s3.region'),
        });

        this.bucket = this.configService.get<string>('aws.s3.bucket');
        this.baseUrl = this.configService.get<string>('aws.s3.baseUrl');
    }

    async checkBucketExistence(): Promise<HeadBucketCommandOutput> {
        const command = new HeadBucketCommand({ Bucket: this.bucket });
        try {
            return await this.s3Client.send(command);
        } catch (err: any) {
            throw err;
        }
    }

    async listBucket(): Promise<string[]> {
        const command = new ListBucketsCommand({});

        try {
            const listBucket = await this.s3Client.send(command);
            return listBucket.Buckets.map((val: Bucket) => val.Name);
        } catch (err: any) {
            throw err;
        }
    }
    async listItemInBucket(prefix?: string): Promise<AwsS3Serialization[]> {
        const command = new ListObjectsV2Command({
            Bucket: this.bucket,
            Prefix: prefix,
        });

        try {
            const listItems = await this.s3Client.send(command);

            const mapList = listItems.Contents.map((val: _Object) => {
                const lastIndex: number = val.Key.lastIndexOf('/');
                const path: string = val.Key.substring(0, lastIndex);
                const filename: string = val.Key.substring(
                    lastIndex + 1,
                    val.Key.length
                );
                const mime: string = filename
                    .substring(filename.lastIndexOf('.') + 1, filename.length)
                    .toLocaleUpperCase();

                return {
                    path,
                    pathWithFilename: val.Key,
                    filename: filename,
                    completedUrl: `${this.baseUrl}/${val.Key}`,
                    baseUrl: this.baseUrl,
                    mime,
                };
            });

            return mapList;
        } catch (err: any) {
            throw err;
        }
    }

    async getItemInBucket(
        fileName: string,
        path?: string
    ): Promise<Readable | ReadableStream<any> | Blob> {
        if (path)
            path = path.startsWith('/') ? path.replace('/', '') : `${path}`;

        const key: string = path ? `${path}/${fileName}` : fileName;
        const command = new GetObjectCommand({
            Bucket: this.bucket,
            Key: key,
        });

        try {
            const item = await this.s3Client.send(command);
            return item.Body;
        } catch (err: any) {
            throw err;
        }
    }

    async putItemInBucket(
        fileName: string,
        content:
            | string
            | Uint8Array
            | Buffer
            | Readable
            | ReadableStream
            | Blob,
        options?: IAwsS3PutItemOptions
    ): Promise<AwsS3Serialization> {
        let path = options?.path;
        const acl = options?.acl ? options.acl : 'public-read';

        if (path)
            path = path.startsWith('/') ? path.replace('/', '') : `${path}`;

        const mime: string = fileName
            .substring(fileName.lastIndexOf('.') + 1, fileName.length)
            .toUpperCase();
        const key: string = path ? `${path}/${fileName}` : fileName;
        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: content,
            ACL: acl,
        });

        try {
            await this.s3Client.send(command);
        } catch (err: any) {
            throw err;
        }

        return {
            path,
            pathWithFilename: key,
            filename: fileName,
            completedUrl: `${this.baseUrl}/${key}`,
            baseUrl: this.baseUrl,
            mime,
        };
    }

    async deleteItemInBucket(fileName: string): Promise<void> {
        const command = new DeleteObjectCommand({
            Bucket: this.bucket,
            Key: fileName,
        });

        try {
            await this.s3Client.send(command);
            return;
        } catch (err: any) {
            throw err;
        }
    }

    async deleteItemsInBucket(fileNames: string[]): Promise<void> {
        const keys = fileNames.map((val: string) => ({ Key: val }));
        const command = new DeleteObjectsCommand({
            Bucket: this.bucket,
            Delete: { Objects: keys },
        });

        try {
            await this.s3Client.send(command);
            return;
        } catch (err: any) {
            throw err;
        }
    }

    async deleteFolder(dir: string): Promise<void> {
        const commandList = new ListObjectsV2Command({
            Bucket: this.bucket,
            Prefix: dir,
        });
        const lists = await this.s3Client.send(commandList);

        try {
            const listItems = lists.Contents.map((val) => ({ Key: val.Key }));
            const commandDeleteItems = new DeleteObjectsCommand({
                Bucket: this.bucket,
                Delete: { Objects: listItems },
            });

            await this.s3Client.send(commandDeleteItems);

            const commandDelete = new DeleteObjectCommand({
                Bucket: this.bucket,
                Key: dir,
            });
            await this.s3Client.send(commandDelete);

            return;
        } catch (err: any) {
            throw err;
        }
    }

    async createMultiPart(
        fileName: string,
        options?: IAwsS3PutItemOptions
    ): Promise<AwsS3MultipartSerialization> {
        let path: string = options?.path;
        const acl: string = options?.acl ? options.acl : 'public-read';

        if (path)
            path = path.startsWith('/') ? path.replace('/', '') : `${path}`;

        const mime: string = fileName
            .substring(fileName.lastIndexOf('.') + 1, fileName.length)
            .toUpperCase();
        const key: string = path ? `${path}/${fileName}` : fileName;

        const multiPartCommand = new CreateMultipartUploadCommand({
            Bucket: this.bucket,
            Key: key,
            ACL: acl,
        });

        try {
            const response = await this.s3Client.send(multiPartCommand);

            return {
                uploadId: response.UploadId,
                path,
                pathWithFilename: key,
                filename: fileName,
                completedUrl: `${this.baseUrl}/${key}`,
                baseUrl: this.baseUrl,
                mime,
            };
        } catch (err: any) {
            throw err;
        }
    }

    async uploadPart(
        path: string,
        content:
            | string
            | Readable
            | ReadableStream<any>
            | Blob
            | Uint8Array
            | Buffer,
        uploadId: string,
        partNumber: number
    ): Promise<AwsS3MultipartPartsSerialization> {
        const uploadPartCommand = new UploadPartCommand({
            Bucket: this.bucket,
            Key: path,
            Body: content,
            PartNumber: partNumber,
            UploadId: uploadId,
        });

        try {
            const { ETag } = await this.s3Client.send(uploadPartCommand);

            return { ETag, PartNumber: partNumber };
        } catch (err: any) {
            throw err;
        }
    }

    async completeMultipart(
        path: string,
        uploadId: string,
        parts: CompletedPart[]
    ): Promise<void> {
        const completeMultipartCommand = new CompleteMultipartUploadCommand({
            Bucket: this.bucket,
            Key: path,
            UploadId: uploadId,
            MultipartUpload: { Parts: parts },
        });

        try {
            await this.s3Client.send(completeMultipartCommand);

            return;
        } catch (err: any) {
            throw err;
        }
    }

    async abortMultipart(path: string, uploadId: string): Promise<void> {
        const abortMultipartCommand = new AbortMultipartUploadCommand({
            Bucket: this.bucket,
            Key: path,
            UploadId: uploadId,
        });

        try {
            await this.s3Client.send(abortMultipartCommand);

            return;
        } catch (err: any) {
            throw err;
        }
    }
}
