import { DataSource, Repository } from "typeorm";
import { config, dialect } from "@configs/database/db.config";

const myDataSource = new DataSource({
    type: dialect,
    host: config.HOST,
    port: 3306,
    username: config.USER,
    password: config.PASSWORD,
    database: config.DB,
    entities: ["src/entities/*.ts"],
    logging: true,
    synchronize: true,
});

export default myDataSource;
