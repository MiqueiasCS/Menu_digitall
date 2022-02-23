import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrderProduct } from "./orderProductEntites";
import { OrderDispatched } from "./orderDispatched";
import { Table } from "./tableEntities";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @UpdateDateColumn()
  order_date!: Date;

  @Column()
  client!: string;

  @ManyToOne(() => Table, (table) => table.orders)
  table!: Table;

  @OneToMany(() => OrderProduct, (orderproduct) => orderproduct.order, {
    cascade: true,
  })
  order_product!: OrderProduct[];

  @OneToMany(() => OrderDispatched, (orderdispatch) => orderdispatch.order, {
    cascade: true,
  })
  dispatched!: OrderDispatched[];
}
