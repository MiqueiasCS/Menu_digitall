import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  email!: string

  @Column({ unique: true })
  username!: string

  @Column()
  password!: string

  @Column({ default: false })
  isAdm!: boolean

  @CreateDateColumn()
  created_at!: Date
  
  @UpdateDateColumn()
  updated_at!: Date
}
