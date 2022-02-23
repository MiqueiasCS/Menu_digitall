import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Order } from "./orderEntites";

@Entity("bills")
export class Bill {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @UpdateDateColumn()
  bill_date!: Date;

  @Column()
  form_of_payment!: string;

  @Column("float")
  final_price!: number;

  @OneToOne(() => Order, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  order!: Order;
}
