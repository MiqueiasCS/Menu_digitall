import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("orders_products")
export class OrderProduct {
  @PrimaryGeneratedColumn("uuid")
  order_product_id!: number;
  @Column()
  product_quantity!: number;
}
