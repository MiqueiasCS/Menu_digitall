import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./orderEntites";
import { Product } from "./productEntities";

@Entity("orders_products")
export class OrderProduct {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  product_quantity!: number;

  @ManyToOne(() => Product, (product) => product.order_product)
  product!: Product;

  @ManyToOne(() => Order, (order) => order.order_product)
  order!: Order;
}
