import {MigrationInterface, QueryRunner} from "typeorm";

export class default1645622030891 implements MigrationInterface {
    name = 'default1645622030891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_dispatched" ALTER COLUMN "note" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_dispatched" ALTER COLUMN "note" DROP DEFAULT`);
    }

}
