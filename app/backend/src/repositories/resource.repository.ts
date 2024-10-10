import { Resource } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class ResourceRepository extends BaseRepository<Resource> {
  constructor() {
    super(Resource, dataSource);
  }
}

export default new ResourceRepository();
