import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BillBackup } from "./billsBackupEntities";

@Entity("orders_backup")
export class OrdersBackup {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  product!: string;

  @Column("float")
  price!: number;

  @Column()
  quantity!: number;

  @ManyToOne(() => BillBackup, (bill) => bill.orders)
  bill!: BillBackup;
}
