import {MigrationInterface, QueryRunner} from "typeorm";

export class updateProductEntity1645015324435 implements MigrationInterface {
    name = 'updateProductEntity1645015324435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "isAvailable" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "isAvailable"`);
    }

}
