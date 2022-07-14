import {MigrationInterface, QueryRunner} from "typeorm";

export class addpassword1657709109996 implements MigrationInterface {
    name = 'addpassword1657709109996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
    }

}
