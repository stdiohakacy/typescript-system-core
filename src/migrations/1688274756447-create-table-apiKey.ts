import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableApiKey1688274756447 implements MigrationInterface {
    name = 'CreateTableApiKey1688274756447';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "api-keys" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying NOT NULL, "name" text NOT NULL, "key" text NOT NULL, "hash" text NOT NULL, "isActive" boolean NOT NULL, "startDate" TIMESTAMP WITH TIME ZONE, "endDate" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_ac5d2f5c3b3336bf6ef21044829" PRIMARY KEY ("id"))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "api-keys"`);
    }
}
