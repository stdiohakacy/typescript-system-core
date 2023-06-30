import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableLogger1688139448420 implements MigrationInterface {
    name = 'CreateTableLogger1688139448420';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "loggers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "level" character varying NOT NULL, "action" character varying NOT NULL, "method" character varying NOT NULL, "requestId" character varying, "userId" character varying, "roleId" character varying, "anonymous" boolean DEFAULT true, "type" character varying, "description" character varying NOT NULL, "params" jsonb, "bodies" jsonb, "statusCode" integer, "path" character varying, "tags" jsonb DEFAULT '[]', CONSTRAINT "PK_29e8f8af58645b7a782e3694a1a" PRIMARY KEY ("id"))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "loggers"`);
    }
}
