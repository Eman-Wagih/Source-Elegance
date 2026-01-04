import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User.js";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // required for Neon
  synchronize: true, // dev only
  logging: false,
  entities: [User],
});
