import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumnTableUser1688450041207 implements MigrationInterface {
    name = 'UpdateColumnTableUser1688450041207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "inactivePermanent"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "inactiveAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "status" character varying NOT NULL DEFAULT 'INACTIVE'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "activeKey" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "activeExpire" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "blocked" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "blocked" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "activeExpire"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "activeKey"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "inactiveAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "users" ADD "inactivePermanent" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isActive" boolean NOT NULL`);
    }

}
