import { default as env } from "@configs/constants/env";

export const config = {
  HOST: env().hostMySql,
  USER: env().userMySql,
  PASSWORD: env().passwordMySql,
  DB: env().databaseMySql,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

export const dialect = "mysql";