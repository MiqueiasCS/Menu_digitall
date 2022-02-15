import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Order } from "./orderEntites";

@Entity("tables")
export class Table {
  @PrimaryGeneratedColumn("uuid")
  table_id!: string;

  @OneToMany(() => Order, (order) => order.table)
  tableidentifier!: Order[];
}
