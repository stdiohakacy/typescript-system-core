import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnActivatedAtTableUser1688471399182 implements MigrationInterface {
    name = 'AddColumnActivatedAtTableUser1688471399182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdBy" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedBy" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedBy" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD "activatedAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "api-keys" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "api-keys" ADD "createdBy" uuid`);
        await queryRunner.query(`ALTER TABLE "api-keys" ADD "updatedBy" uuid`);
        await queryRunner.query(`ALTER TABLE "api-keys" ADD "deletedBy" uuid`);
        await queryRunner.query(`ALTER TABLE "loggers" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "loggers" ADD "createdBy" uuid`);
        await queryRunner.query(`ALTER TABLE "loggers" ADD "updatedBy" uuid`);
        await queryRunner.query(`ALTER TABLE "loggers" ADD "deletedBy" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updatedAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'inactive'`);
        await queryRunner.query(`ALTER TABLE "api-keys" ALTER COLUMN "updatedAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "loggers" ALTER COLUMN "updatedAt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loggers" ALTER COLUMN "updatedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "api-keys" ALTER COLUMN "updatedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'INACTIVE'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updatedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "loggers" DROP COLUMN "deletedBy"`);
        await queryRunner.query(`ALTER TABLE "loggers" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "loggers" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "loggers" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "api-keys" DROP COLUMN "deletedBy"`);
        await queryRunner.query(`ALTER TABLE "api-keys" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "api-keys" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "api-keys" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "activatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedBy"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
    }

}
