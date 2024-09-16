import { Project } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class ProjectRepository extends BaseRepository<Project> {
  constructor() {
    super(Project, dataSource);
  }

  public async findAllSite(): Promise<Project[] | []> {
    return this.find({
      relations: ['manager']
    });
  }
}

export default new ProjectRepository();