import {MigrationInterface, QueryRunner} from "typeorm";

export class test1644938131041 implements MigrationInterface {
    name = 'test1644938131041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bills" ("bill_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bill_date" TIMESTAMP NOT NULL DEFAULT now(), "form_of_payment" character varying NOT NULL, "final_price" double precision NOT NULL, CONSTRAINT "PK_9b257dee70c4266ec5db78733bf" PRIMARY KEY ("bill_id"))`);
        await queryRunner.query(`CREATE TABLE "tables" ("table_id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_974e210546eb2a1941df31b80af" PRIMARY KEY ("table_id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("order_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order_date" TIMESTAMP NOT NULL DEFAULT now(), "client" character varying NOT NULL, "tableTableId" uuid, CONSTRAINT "PK_cad55b3cb25b38be94d2ce831db" PRIMARY KEY ("order_id"))`);
        await queryRunner.query(`CREATE TABLE "orders_products" ("order_product_id" integer NOT NULL, "product_quantity" integer NOT NULL, CONSTRAINT "PK_1ac960e66422b4519ac021c6fbd" PRIMARY KEY ("order_product_id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_e5457488a079924c71fe43e8693" FOREIGN KEY ("tableTableId") REFERENCES "tables"("table_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_e5457488a079924c71fe43e8693"`);
        await queryRunner.query(`DROP TABLE "orders_products"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "tables"`);
        await queryRunner.query(`DROP TABLE "bills"`);
    }

}
