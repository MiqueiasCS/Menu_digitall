import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Order } from "./orderEntites";

@Entity("tables")
export class Table {
  @PrimaryGeneratedColumn("uuid")
  table_id!: string;

  @Column({ unique: true })
  tableidentifier!: string;

  @OneToMany(() => Order, (order) => order.table)
  orders!: Order[];
}
