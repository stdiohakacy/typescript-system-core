import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnTableUser1688643672094 implements MigrationInterface {
    name = 'AddColumnTableUser1688643672094';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" ADD "signUpFrom" character varying NOT NULL DEFAULT 'local'`
        );
        await queryRunner.query(`ALTER TABLE "users" ADD "google" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "google"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "signUpFrom"`);
    }
}
