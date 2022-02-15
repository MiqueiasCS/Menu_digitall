import {MigrationInterface, QueryRunner} from "typeorm";

export class productOrderProduct1644939646778 implements MigrationInterface {
    name = 'productOrderProduct1644939646778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "order_id" TO "id"`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME CONSTRAINT "PK_cad55b3cb25b38be94d2ce831db" TO "PK_710e2d4957aa5878dfe94e4ac2f"`);
        await queryRunner.query(`CREATE TABLE "orders_dispatcheds" ("order_dispatched_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "note" character varying NOT NULL, "processed" boolean NOT NULL, CONSTRAINT "PK_77cc372bfdca63062fde21bc1a5" PRIMARY KEY ("order_dispatched_id"))`);
        await queryRunner.query(`ALTER TABLE "orders_products" DROP CONSTRAINT "PK_1ac960e66422b4519ac021c6fbd"`);
        await queryRunner.query(`ALTER TABLE "orders_products" DROP COLUMN "order_product_id"`);
        await queryRunner.query(`ALTER TABLE "orders_products" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "orders_products" ADD CONSTRAINT "PK_4945c6758fd65ffacda760b4ac9" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "orders_products" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "orders_products" ADD CONSTRAINT "FK_4eff63e89274f79195e25c5c115" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_products" DROP CONSTRAINT "FK_4eff63e89274f79195e25c5c115"`);
        await queryRunner.query(`ALTER TABLE "orders_products" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "orders_products" DROP CONSTRAINT "PK_4945c6758fd65ffacda760b4ac9"`);
        await queryRunner.query(`ALTER TABLE "orders_products" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "orders_products" ADD "order_product_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders_products" ADD CONSTRAINT "PK_1ac960e66422b4519ac021c6fbd" PRIMARY KEY ("order_product_id")`);
        await queryRunner.query(`DROP TABLE "orders_dispatcheds"`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" TO "PK_cad55b3cb25b38be94d2ce831db"`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "id" TO "order_id"`);
    }

}
