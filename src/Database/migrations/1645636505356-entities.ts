import {MigrationInterface, QueryRunner} from "typeorm";

export class entities1645636505356 implements MigrationInterface {
    name = 'entities1645636505356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" double precision NOT NULL, "available" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders_products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_quantity" integer NOT NULL, "productId" uuid, "orderId" uuid, CONSTRAINT "PK_4945c6758fd65ffacda760b4ac9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders_dispatched" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "note" character varying NOT NULL DEFAULT '', "tableidentifier" character varying NOT NULL, "processed" boolean NOT NULL DEFAULT false, "orderId" uuid, CONSTRAINT "PK_b5915925e54182d30b7910d8a0a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "table" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tableidentifier" character varying NOT NULL, CONSTRAINT "UQ_01f317097c1b15fa21ed5e710d0" UNIQUE ("tableidentifier"), CONSTRAINT "PK_28914b55c485fc2d7a101b1b2a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order_date" TIMESTAMP NOT NULL DEFAULT now(), "client" character varying NOT NULL, "tableId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bill_date" TIMESTAMP NOT NULL DEFAULT now(), "form_of_payment" character varying NOT NULL, "final_price" double precision NOT NULL, "orderId" uuid, CONSTRAINT "REL_8b07afbe724f329c2a65c387c3" UNIQUE ("orderId"), CONSTRAINT "PK_a56215dfcb525755ec832cc80b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders_backup" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product" character varying NOT NULL, "price" double precision NOT NULL, "quantity" integer NOT NULL, "billId" uuid, CONSTRAINT "PK_0ffe6cdc60cde00607031130cf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bill_backup" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "billDate" character varying NOT NULL, "client" character varying NOT NULL, "formOfPayment" character varying NOT NULL, "totalPaid" double precision NOT NULL, CONSTRAINT "PK_7a82cbad952bcf15f8f19f67b84" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders_products" ADD CONSTRAINT "FK_4eff63e89274f79195e25c5c115" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_products" ADD CONSTRAINT "FK_823bad3524a5d095453c43286bb" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_dispatched" ADD CONSTRAINT "FK_958457d9434d93e471f23c8ed26" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_2a7fdd7af437285a3ef0fc8b64f" FOREIGN KEY ("tableId") REFERENCES "table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bills" ADD CONSTRAINT "FK_8b07afbe724f329c2a65c387c31" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_backup" ADD CONSTRAINT "FK_a4ee06e9a3db4b4ff779e17e5d4" FOREIGN KEY ("billId") REFERENCES "bill_backup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_backup" DROP CONSTRAINT "FK_a4ee06e9a3db4b4ff779e17e5d4"`);
        await queryRunner.query(`ALTER TABLE "bills" DROP CONSTRAINT "FK_8b07afbe724f329c2a65c387c31"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_2a7fdd7af437285a3ef0fc8b64f"`);
        await queryRunner.query(`ALTER TABLE "orders_dispatched" DROP CONSTRAINT "FK_958457d9434d93e471f23c8ed26"`);
        await queryRunner.query(`ALTER TABLE "orders_products" DROP CONSTRAINT "FK_823bad3524a5d095453c43286bb"`);
        await queryRunner.query(`ALTER TABLE "orders_products" DROP CONSTRAINT "FK_4eff63e89274f79195e25c5c115"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "bill_backup"`);
        await queryRunner.query(`DROP TABLE "orders_backup"`);
        await queryRunner.query(`DROP TABLE "bills"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "table"`);
        await queryRunner.query(`DROP TABLE "orders_dispatched"`);
        await queryRunner.query(`DROP TABLE "orders_products"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
