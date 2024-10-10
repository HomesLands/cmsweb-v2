import { DataSource } from "typeorm";
import { env } from "@constants";
import { join } from "path";
import { logger } from "@lib";

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
  entities: [join(__dirname, "../entities", "*.entity.{ts,js}")],
  logging: false,
  synchronize: false,
  migrations: [join(__dirname, "../migration", "*.{ts,js}")],
  subscribers: [join(__dirname, "../entities/subscriber", "*.{ts,js}")],
});

export async function initializeDataSource(
  retries = 5,
  delay = 3000 // ms
): Promise<void> {
  while (retries > 0) {
    try {
      await dataSource.initialize();
      logger.info("Data Source has been initialized!");
      return;
    } catch (err) {
      retries -= 1;
      logger.error(
        `Error during Data Source initialization. Retries left: ${retries}. Error:`,
        err
      );

      if (retries === 0) {
        logger.error(
          "Failed to initialize Data Source after multiple attempts."
        );
        throw err; // You can either throw or exit the process here
      }

      // Wait for the specified delay before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
