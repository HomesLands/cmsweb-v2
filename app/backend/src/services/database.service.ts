import { env } from "@constants";
import { ErrorCodes, GlobalError } from "@exception";
import { exec } from "child_process";
import { Response } from "express";
import fs from "fs";
import path from "path";

class DatabaseService {
  public async backup(res: Response) {
    const dumpFilePath = await this.export();

    // Set headers for file download
    res.setHeader("Content-Type", "application/sql");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${path.basename(dumpFilePath)}"`
    );

    // Stream the file to the client
    const readStream = fs.createReadStream(dumpFilePath);
    readStream.pipe(res);

    // Clean up the file after sending
    readStream.on("end", async () => {
      await this.cleanUp(dumpFilePath);
    });

    readStream.on("error", async (err) => {
      console.error(`Error reading file: ${err.message}`);
      await this.cleanUp(dumpFilePath);
      res
        .status(500)
        .json({ error: "Failed to send the file.", details: err.message });
    });
  }

  private async export(): Promise<string> {
    return new Promise((resolve, reject) => {
      const timestamp = new Date().toISOString().replace(/[:.]/g, "_");
      const fileName = `${env.dataSource.databaseMySql}_${timestamp}.sql`;
      const backupPath = path.join(process.cwd(), "backup");
      if (!fs.existsSync(backupPath)) {
        fs.mkdirSync(backupPath, { recursive: true });
      }
      const dumpFilePath = path.join(backupPath, fileName);

      // Create the dump command
      const dumpCommand = `mysqldump -h ${env.dataSource.hostMySql} -u ${env.dataSource.userMySql} -p${env.dataSource.passwordMySql} ${env.dataSource.databaseMySql} > ${dumpFilePath}`;

      exec(dumpCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return reject(new GlobalError(ErrorCodes.EXPORT_DB_ERROR));
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
        }
        resolve(dumpFilePath);
      });
    });
  }

  private async cleanUp(filePath: string) {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting temporary file: ${err.message}`);
          return reject(err);
        }
        resolve(0);
      });
    });
  }
}

export default new DatabaseService();
