import {MigrationInterface, QueryRunner} from "typeorm";

export class empnew1231657654342568 implements MigrationInterface {
    name = 'empnew1231657654342568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "address_id" TO "employee_address_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "employee_address_id" TO "address_id"`);
    }

}
