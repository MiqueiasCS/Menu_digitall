import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("orders_dispatcheds")
export class OrderDispatched {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column()
  note!: string;

  @Column()
  processed!: boolean;
}
