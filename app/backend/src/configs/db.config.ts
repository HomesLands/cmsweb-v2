import { DataSource } from "typeorm";
import { env } from "@constants";
import { join } from "path";

const config = {
  HOST: env.dataSource.hostMySql,
  USER: env.dataSource.userMySql,
  PASSWORD: env.dataSource.passwordMySql,
  DB: env.dataSource.databaseMySql,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export const dataSource = new DataSource({
  type: "mysql",
  host: config.HOST,
  port: 3306,
  username: config.USER,
  password: config.PASSWORD,
  database: config.DB,
  // entities: [join(__dirname, "**", "*.entity.{ts,js}")],
  // entities: ["src/entities/*.entity.ts"],
  entities: [join(__dirname, "../entities", "*.entity.{ts,js}")],
  // entities: [join(__dirname, "../entities", "!(*base).entity.{ts,js}")],
  logging: false,
  synchronize: true,
});
