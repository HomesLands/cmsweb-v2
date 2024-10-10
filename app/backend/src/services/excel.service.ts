import { Workbook } from "exceljs";
import { TProductRequisitionFormDataExport } from "@types";

class ExcelService {
  public generateProductRequisitionFormExcel(
    data: TProductRequisitionFormDataExport[],
    creatorName: string,
    createDate: string,
    siteName: string,
    projectName: string,
    companyName: string,
  ): Workbook {
    const workbook = new Workbook();

    const worksheet = workbook.addWorksheet("Product requisition form");
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.font = { size: 13 };
      });
    });
    worksheet.mergeCells('A1:B2');
    const cellA1 = worksheet.getCell('A1');
    cellA1.value = companyName;
    cellA1.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true};
    cellA1.font = { size: 15, bold: true };

    worksheet.mergeCells('C1:C2');
    const cellC1 = worksheet.getCell('C1');
    cellC1.value = 'PHIẾU YÊU CẦU\nVẬT TƯ';
    cellC1.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cellC1.font = { size: 13, bold: true };

    worksheet.mergeCells('D1:E1');
    const cellD1 = worksheet.getCell('D1');
    cellD1.alignment = { vertical: 'middle', horizontal: 'center'};
    cellD1.value = 'KMH';
    cellD1.font = { size: 13};

    worksheet.mergeCells('D2:E2');
    const cellD2 = worksheet.getCell('D2');
    cellD2.alignment = { vertical: 'middle', horizontal: 'center'};
    cellD2.value = 'Lần Ban Hành';
    cellD2.font = { size: 13};

    const cellF1 = worksheet.getCell('F1');
    cellF1.alignment = { vertical: 'middle', horizontal: 'center'};
    cellF1.value = 'QR3-01/001';
    cellF1.font = { size: 13};

    const cellF2 = worksheet.getCell('F2');
    cellF2.alignment = { vertical: 'middle', horizontal: 'center'};
    cellF2.value = '1';
    cellF2.font = { size: 13};

    cellA1.border = {
      top: { style: 'thick' },
      left: { style: 'thick' },
      bottom: { style: 'thick'},
      right: { style: 'thick'},
    }
    cellC1.border = cellD1.border = cellD2.border = cellF1.border = cellF2.border = {
      top: { style: 'thick' },
      bottom: { style: 'thick'},
      right: { style: 'thick'},
    }

    worksheet.addRow([]);

    const row4 = worksheet.addRow([`Nguời yêu cầu`, `${creatorName}`, `Công trình sử dụng`, `${siteName}`]);
    const row5 = worksheet.addRow([`Ngày`, `${createDate}`, `Dự án`, `${projectName}`]);
    worksheet.mergeCells('D4:E4');
    worksheet.mergeCells('D5:E5');

    for (let rowNum = row4.number; rowNum <= row5.number; rowNum++) {
      const row = worksheet.getRow(rowNum);
      row.eachCell((cell) => {
        cell.font = { size: 13 };
      });
    }
    
    worksheet.addRow([]);

    const headerRow = worksheet.addRow(["STT", "TÊN VẬT TƯ", "HÃNG SẢN XUẤT", "SỐ LƯỢNG", "ĐƠN VỊ", "GHI CHÚ"]);

    headerRow.eachCell((cell) => {
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF00B050' }
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.font = { size: 13, bold: true, color: { argb: 'FFFFFFFF' } };

        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
      };
    });
    worksheet.columns = [
      { key: "order", width: 20 },
      { key: "name", width: 45 },
      { key: "provider", width: 30 },
      { key: "quantity", width: 15 },
      { key: "unit", width: 20 },
      { key: "description", width: 35 },
    ];

    data.forEach(requestProduct => {
      const dataRow = worksheet.addRow(requestProduct);
      
      dataRow.eachCell((cell, colNumber) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
        cell.font = { size: 13 };
        cell.alignment = { vertical: 'middle', wrapText: true };

        if (colNumber === 1 || colNumber === 4 || colNumber === 5) {
          cell.alignment.horizontal = 'center';
        }
      });
    });
    return workbook;
  }
}
export default new ExcelService();