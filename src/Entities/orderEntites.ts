import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Table } from "./tableEntities";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  order_id!: string;

  @UpdateDateColumn()
  order_date!: Date;

  @Column()
  client!: string;

  @ManyToOne(() => Table, (table) => table.tableidentifier)
  table!: Table;
}
