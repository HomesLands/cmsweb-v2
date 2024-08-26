import { DataSource } from "typeorm";
import { env } from "@constants";

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
  entities: ["src/entities/*.ts"],
  logging: false,
  synchronize: true,
});
