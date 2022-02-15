import {MigrationInterface, QueryRunner} from "typeorm";

export class relationships1644952695695 implements MigrationInterface {
    name = 'relationships1644952695695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_dispatcheds" ADD "orderId" uuid`);
        await queryRunner.query(`ALTER TABLE "bills" ADD "orderId" uuid`);
        await queryRunner.query(`ALTER TABLE "bills" ADD CONSTRAINT "UQ_8b07afbe724f329c2a65c387c31" UNIQUE ("orderId")`);
        await queryRunner.query(`ALTER TABLE "orders_dispatcheds" ALTER COLUMN "processed" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "orders_dispatcheds" ADD CONSTRAINT "FK_8464aeff48a2d38f71aa15814d5" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bills" ADD CONSTRAINT "FK_8b07afbe724f329c2a65c387c31" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bills" DROP CONSTRAINT "FK_8b07afbe724f329c2a65c387c31"`);
        await queryRunner.query(`ALTER TABLE "orders_dispatcheds" DROP CONSTRAINT "FK_8464aeff48a2d38f71aa15814d5"`);
        await queryRunner.query(`ALTER TABLE "orders_dispatcheds" ALTER COLUMN "processed" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "bills" DROP CONSTRAINT "UQ_8b07afbe724f329c2a65c387c31"`);
        await queryRunner.query(`ALTER TABLE "bills" DROP COLUMN "orderId"`);
        await queryRunner.query(`ALTER TABLE "orders_dispatcheds" DROP COLUMN "orderId"`);
    }

}
