import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrdersBackup } from "./ordersBackupEntities";

@Entity("bill_backup")
export class BillBackup {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn()
  created_at!: Date;

  @Column()
  billDate!: string;

  @Column()
  client!: string;

  @Column()
  formOfPayment!: string;

  @Column("float")
  totalPaid!: number;

  @OneToMany(() => OrdersBackup, (orderbackup) => orderbackup.bill, {
    cascade: true,
  })
  orders!: OrdersBackup[];
}
