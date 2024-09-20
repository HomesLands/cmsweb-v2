import { Project } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class ProjectRepository extends BaseRepository<Project> {
  constructor() {
    super(Project, dataSource);
  }
}

export default new ProjectRepository();