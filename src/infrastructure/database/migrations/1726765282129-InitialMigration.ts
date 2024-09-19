import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1726765282129 implements MigrationInterface {
    name = 'InitialMigration1726765282129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "member" ("code" character varying NOT NULL, "name" character varying NOT NULL, "is_penalized" boolean NOT NULL DEFAULT false, "penalty_end_date" TIMESTAMP, CONSTRAINT "PK_87dbb39d7c7c430faa5bf1af3bb" PRIMARY KEY ("code"))`);
        await queryRunner.query(`CREATE TABLE "book" ("code" character varying NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "stock" integer NOT NULL, CONSTRAINT "PK_153910bab5ef6438fb822a0c143" PRIMARY KEY ("code"))`);
        await queryRunner.query(`CREATE TABLE "borrow" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "borrow_date" TIMESTAMP NOT NULL, "return_date" TIMESTAMP, "bookCode" character varying, "memberCode" character varying, CONSTRAINT "PK_dff0c680b9c6fc99f5a20d67a97" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "borrow" ADD CONSTRAINT "FK_777ff38e41465d0a7cb312f3e05" FOREIGN KEY ("bookCode") REFERENCES "book"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "borrow" ADD CONSTRAINT "FK_62e738d978b6ba1ce8d9d208e9b" FOREIGN KEY ("memberCode") REFERENCES "member"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "borrow" DROP CONSTRAINT "FK_62e738d978b6ba1ce8d9d208e9b"`);
        await queryRunner.query(`ALTER TABLE "borrow" DROP CONSTRAINT "FK_777ff38e41465d0a7cb312f3e05"`);
        await queryRunner.query(`DROP TABLE "borrow"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "member"`);
    }

}
