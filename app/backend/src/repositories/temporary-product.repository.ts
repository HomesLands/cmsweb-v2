import { TemporaryProduct } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class TemporaryProductRepository extends BaseRepository<TemporaryProduct> {
  constructor() {
    super(TemporaryProduct, dataSource);
  }
}

export default new TemporaryProductRepository();