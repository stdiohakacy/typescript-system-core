import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUser1688376870457 implements MigrationInterface {
    name = 'CreateTableUser1688376870457';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "phone" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "passwordExpired" TIMESTAMP WITH TIME ZONE, "passwordCreated" TIMESTAMP WITH TIME ZONE, "passwordAttempt" integer, "salt" character varying NOT NULL, "isActive" boolean NOT NULL, "inactivePermanent" boolean NOT NULL, "inactiveAt" TIMESTAMP WITH TIME ZONE NOT NULL, "blocked" boolean, "blockedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
