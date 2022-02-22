import {MigrationInterface, QueryRunner} from "typeorm";

export class backupEntities1645567989189 implements MigrationInterface {
    name = 'backupEntities1645567989189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders_backup" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product" character varying NOT NULL, "price" double precision NOT NULL, "quantity" integer NOT NULL, "billId" uuid, CONSTRAINT "PK_0ffe6cdc60cde00607031130cf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bill_backup" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "billDate" character varying NOT NULL, "client" character varying NOT NULL, "formOfPayment" character varying NOT NULL, "totalPaid" double precision NOT NULL, CONSTRAINT "PK_7a82cbad952bcf15f8f19f67b84" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders_backup" ADD CONSTRAINT "FK_a4ee06e9a3db4b4ff779e17e5d4" FOREIGN KEY ("billId") REFERENCES "bill_backup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_backup" DROP CONSTRAINT "FK_a4ee06e9a3db4b4ff779e17e5d4"`);
        await queryRunner.query(`DROP TABLE "bill_backup"`);
        await queryRunner.query(`DROP TABLE "orders_backup"`);
    }

}
