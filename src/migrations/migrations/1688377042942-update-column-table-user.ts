import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumnTableUser1688377042942 implements MigrationInterface {
    name = 'UpdateColumnTableUser1688377042942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "inactiveAt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "inactiveAt" SET NOT NULL`);
    }

}
