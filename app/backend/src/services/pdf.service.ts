import * as ejs from "ejs";
import * as fs from "fs";
import puppeteer from "puppeteer";
import path from "path";
import { GlobalError } from "@exception/global-error";
import { ErrorCodes } from "@exception/error-code";

class PDFService {
  public async generatePDF({
    templateName,
    data,
  }: {
    templateName: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
  }): Promise<Buffer> {
    const templatePath = path.join(process.cwd(), "/views/pages", templateName);

    const template = await fs.promises.readFile(templatePath, "utf8");
    const html = ejs.render(template, data);
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"],
      });
      const page = await browser.newPage();

      await page.setContent(html, {
        waitUntil: "networkidle0",
      });

      const buffer = await page.pdf({
        format: "A4",
        landscape: true,
        printBackground: true,
      });

      await browser.close();
      return Buffer.from(buffer);
    } catch (err) {
      console.log({ err });
      throw new GlobalError(ErrorCodes.FILE_NOT_FOUND);
    }
  }
}
export default new PDFService();
