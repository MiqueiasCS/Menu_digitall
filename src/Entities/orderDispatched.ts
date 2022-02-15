import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("orders_dispatcheds")
export class OrderDispatched {
  @PrimaryGeneratedColumn("uuid")
  order_dispatched_id!: number;

  @Column()
  note!: string;

  @Column()
  processed!: boolean;
}
