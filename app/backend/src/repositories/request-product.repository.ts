import { RequestProduct } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class RequestProductRepository extends BaseRepository<RequestProduct> {
  constructor() {
    super(RequestProduct, dataSource);
  }
}

export default new RequestProductRepository();