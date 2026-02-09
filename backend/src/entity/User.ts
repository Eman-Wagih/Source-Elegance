import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from "typeorm";
import { Product } from "./Product.js";
import bcrypt  from 'bcrypt'

export type userType = "shopper" | "seller";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: false })
  fullName!: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  userName!: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  email!: string;

  @Column({ type: "varchar", nullable: false })
  password!: string;
  @BeforeInsert()
  async hashPassword() {
  this.password = await bcrypt.hash(this.password, 10); 
}


  @Column({ type: "varchar", default: "shopper" })
  type!: userType;

  @OneToMany(() => Product, (product) => product.seller)
  products!: Product[];
}

