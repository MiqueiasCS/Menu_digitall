import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./orderEntites";

@Entity("orders_dispatcheds")
export class OrderDispatched {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column()
  note!: string;

  @Column({ default: false })
  processed!: boolean;

  @ManyToOne(() => Order, (order) => order.dispatched)
  order!: Order;
}
