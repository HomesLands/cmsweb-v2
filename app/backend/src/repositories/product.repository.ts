import { Product } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super(Product, dataSource);
  }

}

export default new ProductRepository();