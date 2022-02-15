import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Order } from "./orderEntites";

@Entity("table")
export class Table {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  tableidentifier!: string;

  @OneToMany(() => Order, (order) => order.table)
  orders!: Order[];
}
