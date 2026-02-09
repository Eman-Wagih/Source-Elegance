import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./Product.js";

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

  @Column({ type: "varchar", default: "shopper" })
  type!: userType;

  @OneToMany(() => Product, (product) => product.seller)
  products!: Product[];
}
