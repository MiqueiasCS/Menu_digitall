import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./orderEntites";

@Entity("orders_dispatched")
export class OrderDispatched {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ default: "" })
  note!: string;

  @Column()
  tableidentifier!: string;

  @Column({ default: false })
  processed!: boolean;

  @ManyToOne(() => Order, (order) => order.dispatched, {
    cascade: true,
    onDelete: "CASCADE",
  })
  order!: Order;
}
