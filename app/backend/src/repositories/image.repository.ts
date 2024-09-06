import { Image } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

export class ImageRepository extends BaseRepository<Image> {
  constructor() {
    super(Image, dataSource);
  }
}
