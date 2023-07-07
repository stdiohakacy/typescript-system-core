import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnTableUser1688663132943 implements MigrationInterface {
    name = 'AddColumnTableUser1688663132943';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" ADD "inactivePermanent" boolean`
        );
        await queryRunner.query(
            `ALTER TABLE "users" ADD "inactiveDate" TIMESTAMP WITH TIME ZONE`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" DROP COLUMN "inactiveDate"`
        );
        await queryRunner.query(
            `ALTER TABLE "users" DROP COLUMN "inactivePermanent"`
        );
    }
}
