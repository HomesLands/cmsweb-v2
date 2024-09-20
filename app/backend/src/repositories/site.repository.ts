import { Site } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class SiteRepository extends BaseRepository<Site> {
  constructor() {
    super(Site, dataSource);
  }
}

export default new SiteRepository();