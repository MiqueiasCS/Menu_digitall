import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { OrderProduct } from "./orderProductEntites";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column("float")
  price!: number;

  @Column({ default: true })
  available!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => OrderProduct, (orderproduct) => orderproduct.product, {
    cascade: true,
    onDelete: "CASCADE",
  })
  order_product!: OrderProduct[];
}
