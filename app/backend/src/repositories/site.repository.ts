import { Site } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class SiteRepository extends BaseRepository<Site> {
  constructor() {
    super(Site, dataSource);
  }

  public async findAllSite(): Promise<Site[] | []> {
    return this.find({
      relations: ['manager']
    });
  }
}

export default new SiteRepository();