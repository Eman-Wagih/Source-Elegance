import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User.js";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: false })
  productName!: string;

  @Column({ type: "varchar" })
  productDescription!: string;

  @Column({ type: "float", nullable: false })
  price!: number;

  @Column({ type: "varchar", array: true, nullable: false })
  image!: string[];

  @Column({ type: "float" })
  rating!: number;

  @ManyToOne(() => User, (user) => user.products, { nullable: false })
  @JoinColumn({ name: "sellerId" })
  seller!: User;
}
