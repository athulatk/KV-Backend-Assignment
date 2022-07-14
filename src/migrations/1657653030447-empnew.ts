import {MigrationInterface, QueryRunner} from "typeorm";

export class empnew1657653030447 implements MigrationInterface {
    name = 'empnew1657653030447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employeeaddress" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "address_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "house_name" character varying NOT NULL, "street_name" character varying NOT NULL, "city" TIMESTAMP NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "zip_code" character varying NOT NULL, CONSTRAINT "PK_c9393b18c154a93c18649e3efa8" PRIMARY KEY ("address_id"))`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "joiningdate"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "joining_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "employee_address_address_id" uuid`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_2fde3cf9dbd6800b852602f97c2" UNIQUE ("employee_address_address_id")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_2fde3cf9dbd6800b852602f97c2" FOREIGN KEY ("employee_address_address_id") REFERENCES "employeeaddress"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_2fde3cf9dbd6800b852602f97c2"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_2fde3cf9dbd6800b852602f97c2"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employee_address_address_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "joining_date"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "joiningdate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`DROP TABLE "employeeaddress"`);
    }

}
