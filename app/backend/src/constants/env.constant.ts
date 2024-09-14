import dotenv from "dotenv";
import { TEnv } from "types";

dotenv.config();

export const env: TEnv = {
  dataSource: {
    hostMySql: process.env.HOST_MYSQL || "",
    userMySql: process.env.USER_MYSQL || "",
    passwordMySql: process.env.PASSWORD_MYSQL || "",
    databaseMySql: process.env.DATABASE_MYSQL || "",
  },
  hashSalt: process.env.HASH_SALT || "",
  jwtSecret: process.env.JWT_SECRET || "",
  passportSecret: process.env.PASSPORT_SECRET || "",
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  duration: process.env.DURATION ? parseInt(process.env.DURATION, 10) : 3600,
  refreshableDuration: process.env.REFRESHABLE_DURATION
    ? parseInt(process.env.REFRESHABLE_DURATION, 10)
    : 36000,
};
