import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("orders_products")
export class OrderProduct {
  @PrimaryColumn()
  order_product_id!: number;
  @Column()
  product_quantity!: number;
}
