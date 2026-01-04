import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export type userType = "shopper" | "seller";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", nullable: false })
  firstName!: string;

  @Column({ type: "varchar", nullable: false })
  lastName!: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  email!: string;

  @Column({ type: "varchar", nullable: false })
  password!: string;

  @Column({ type: "varchar", default: "shopper" })
  type!: userType;
}
