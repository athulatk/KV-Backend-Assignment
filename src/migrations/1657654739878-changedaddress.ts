import {MigrationInterface, QueryRunner} from "typeorm";

export class changedaddress1657654739878 implements MigrationInterface {
    name = 'changedaddress1657654739878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employeeaddress" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "employeeaddress" ADD "city" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employeeaddress" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "employeeaddress" ADD "city" TIMESTAMP NOT NULL`);
    }

}
