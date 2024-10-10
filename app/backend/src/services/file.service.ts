import { File } from "@entities";
import { fileRepository } from "@repositories";
import { GlobalError, ErrorCodes } from "@exception";

export class FileUploadService {
  private async saveFile(requestData: Express.Multer.File): Promise<File> {
    if (!requestData) throw new GlobalError(ErrorCodes.FILE_NOT_FOUND);

    const file = new File();
    const filename = requestData.originalname.split(".")[0].replace(" ", "-");
    Object.assign(file, {
      data: requestData.buffer.toString("base64"),
      name: `${filename}-${Date.now()}`,
      extension: requestData.originalname.split(".")[1],
      mimetype: requestData.mimetype,
      size: requestData.size,
    });

    return await fileRepository.createAndSave(file);
  }

  public async uploadFile(file?: Express.Multer.File): Promise<File> {
    if (!file) throw new GlobalError(ErrorCodes.FILE_NOT_FOUND);
    return this.saveFile(file);
  }

  public async uploadFiles(_files: Express.Multer.File[]): Promise<File[]> {
    return [];
  }

  public async getFileByName(filename: string): Promise<File> {
    const name = filename.split(".")[0];
    const file = await fileRepository.findOneBy({ name });
    if (!file) throw new GlobalError(ErrorCodes.FILE_NOT_FOUND);
    return file;
  }

  public async removeFileByName(filename?: string): Promise<void> {
    const name = filename?.split(".")[0];
    const file = await fileRepository.findOneBy({ name });
    if (!file) return;
    await fileRepository.remove(file);
  }
}

export default new FileUploadService();
