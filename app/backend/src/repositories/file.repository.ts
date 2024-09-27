import { File } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

export class FileRepository extends BaseRepository<File> {
  constructor() {
    super(File, dataSource);
  }
}

export default new FileRepository();