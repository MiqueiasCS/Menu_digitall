import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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
}
