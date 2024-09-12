import { Application } from "express";
import morgan from "morgan";
import fs from "fs";
import moment from "moment";
import path from "path";

import { isDevEnvironment } from "heppers";

export const registerMorgan = (app: Application) => {
  if (!isDevEnvironment()) {
    const logDirectory = path.resolve("logs");
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }
    const logPath = path.join(process.cwd(), "/logs/access.log");
    const accessLogStream = fs.createWriteStream(logPath, { flags: "a" });
    app.use(morgan("combined", { stream: accessLogStream }));
  } else if (isDevEnvironment()) {
    // Custom token for date formatting
    morgan.token("custom-date", () => {
      return moment().format("YYYY-MM-DD HH:mm:ss");
    });

    app.use(morgan(":custom-date [:method] :url :status"));
  }
};
