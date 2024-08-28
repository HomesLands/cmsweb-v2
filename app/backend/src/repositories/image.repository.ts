import { Image } from "@entities";
import { BaseRepository } from "./base.repository";

export class ImageRepository extends BaseRepository<Image> {
  constructor() {
    super(Image);
  }
}
