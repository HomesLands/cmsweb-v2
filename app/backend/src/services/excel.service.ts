import { ErrorCodes } from "@exception/error-code";
import { GlobalError } from "@exception/global-error";
import { Workbook } from "exceljs";
import path from "path";
import { generateFileName } from "@utils";
import { Extension } from "@enums";
import { TFileResponseDto } from "@types";

class ExcelService {
  public async generate({
    filename,
    cellData,
  }: {
    filename: string;
    cellData: { cellPosition: string; value: string; type: string }[];
  }): Promise<TFileResponseDto> {
    // Read file
    const templatePath = path.resolve("public/templates/excel", filename);
    const workbook = new Workbook();
    await workbook.xlsx.readFile(templatePath);

    // Write file
    if (workbook.worksheets.length <= 0)
      throw new GlobalError(ErrorCodes.WORKSHEET_NOT_FOUND);
    const worksheet = workbook.worksheets[0];

    for (const item of cellData) {
      if (item.type === "data") {
        worksheet.getCell(item.cellPosition).value = item.value;
      } else if (item.type === "image") {
        const imageUrl = item.value;
        const response = await fetch(imageUrl);
        const buffer = await response.arrayBuffer();

        const image = workbook.addImage({
          buffer: buffer,
          extension: "jpeg",
        });

        const tl = this.extractPosition(item.cellPosition);
        if (tl) {
          worksheet.addImage(image, {
            tl: { col: 0, row: 0 },
            ext: { width: 120, height: 80 }, // Set desired width and height
            editAs: "oneCell", // Optional: can be "oneCell" or "absolute"
          });
        }
      }
    }
    // Generate buffer of the Excel file in memory
    const buffer = await workbook.xlsx.writeBuffer();

    return { filename: generateFileName(Extension.EXCEL), buffer };
  }

  private extractPosition(cellPosition: string) {
    const match = cellPosition.match(/^([A-Z]+)(\d+)$/);

    if (match) {
      return {
        col: this.columnToNumber(match[1]), // Extract the letters (column)
        row: parseInt(match[2], 10), // Extract the digits (row) and convert to a number
      };
    }

    // If the cellPosition is not valid, return null or handle the error
    return null;
  }

  private columnToNumber(column: string) {
    let number = 0;
    for (let i = 0; i < column.length; i++) {
      number = number * 26 + (column.charCodeAt(i) - "A".charCodeAt(0) + 1);
    }
    return number;
  }
}
export default new ExcelService();
