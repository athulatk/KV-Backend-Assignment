import {MigrationInterface, QueryRunner} from "typeorm";

export class emp1657651356244 implements MigrationInterface {
    name = 'emp1657651356244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "joiningdate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "experience" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "idproof" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "idproof"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "joiningdate"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "email"`);
    }

}
