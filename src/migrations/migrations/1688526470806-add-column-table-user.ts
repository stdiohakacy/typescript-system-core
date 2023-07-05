import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnTableUser1688526470806 implements MigrationInterface {
    name = 'AddColumnTableUser1688526470806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "forgotKey" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "forgotExpire" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "forgotExpire"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "forgotKey"`);
    }

}
