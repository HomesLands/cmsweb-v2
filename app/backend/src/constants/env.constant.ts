import dotenv from "dotenv";
import { IEnv } from "types";

dotenv.config();

export const env: IEnv = {
  dataSource: {
    hostMySql: process.env.HOST_MYSQL!,
    userMySql: process.env.USER_MYSQL!,
    passwordMySql: process.env.PASSWORD_MYSQL!,
    databaseMySql: process.env.DATABASE_MYSQL!,
  },
};
