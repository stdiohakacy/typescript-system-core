import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnTableUser1688634176793 implements MigrationInterface {
    name = 'AddColumnTableUser1688634176793';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "photo" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "photo"`);
    }
}
