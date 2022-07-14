import {MigrationInterface, QueryRunner} from "typeorm";

export class empnew12341657654440367 implements MigrationInterface {
    name = 'empnew12341657654440367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_2fde3cf9dbd6800b852602f97c2"`);
        await queryRunner.query(`ALTER TABLE "employeeaddress" RENAME COLUMN "address_id" TO "id"`);
        await queryRunner.query(`ALTER TABLE "employeeaddress" RENAME CONSTRAINT "PK_c9393b18c154a93c18649e3efa8" TO "PK_42ad9c0eb4a96c721afaf7487d9"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_2fde3cf9dbd6800b852602f97c2"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employee_address_address_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employee_address_id"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "employee_address_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_75ec3f5b3f68f8613ab0dbed286" UNIQUE ("employee_address_id")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_75ec3f5b3f68f8613ab0dbed286" FOREIGN KEY ("employee_address_id") REFERENCES "employeeaddress"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_75ec3f5b3f68f8613ab0dbed286"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_75ec3f5b3f68f8613ab0dbed286"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employee_address_id"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "employee_address_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "employee_address_address_id" uuid`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_2fde3cf9dbd6800b852602f97c2" UNIQUE ("employee_address_address_id")`);
        await queryRunner.query(`ALTER TABLE "employeeaddress" RENAME CONSTRAINT "PK_42ad9c0eb4a96c721afaf7487d9" TO "PK_c9393b18c154a93c18649e3efa8"`);
        await queryRunner.query(`ALTER TABLE "employeeaddress" RENAME COLUMN "id" TO "address_id"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_2fde3cf9dbd6800b852602f97c2" FOREIGN KEY ("employee_address_address_id") REFERENCES "employeeaddress"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
