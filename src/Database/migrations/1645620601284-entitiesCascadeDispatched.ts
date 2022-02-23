import {MigrationInterface, QueryRunner} from "typeorm";

export class entitiesCascadeDispatched1645620601284 implements MigrationInterface {
    name = 'entitiesCascadeDispatched1645620601284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_dispatched" DROP CONSTRAINT "FK_958457d9434d93e471f23c8ed26"`);
        await queryRunner.query(`ALTER TABLE "bills" DROP CONSTRAINT "FK_8b07afbe724f329c2a65c387c31"`);
        await queryRunner.query(`ALTER TABLE "orders_dispatched" ADD CONSTRAINT "FK_958457d9434d93e471f23c8ed26" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bills" ADD CONSTRAINT "FK_8b07afbe724f329c2a65c387c31" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bills" DROP CONSTRAINT "FK_8b07afbe724f329c2a65c387c31"`);
        await queryRunner.query(`ALTER TABLE "orders_dispatched" DROP CONSTRAINT "FK_958457d9434d93e471f23c8ed26"`);
        await queryRunner.query(`ALTER TABLE "bills" ADD CONSTRAINT "FK_8b07afbe724f329c2a65c387c31" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_dispatched" ADD CONSTRAINT "FK_958457d9434d93e471f23c8ed26" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
