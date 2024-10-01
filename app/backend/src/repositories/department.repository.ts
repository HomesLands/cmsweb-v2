import { Department } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class DepartmentRepository extends BaseRepository<Department> {
  constructor() {
    super(Department, dataSource);
  }
}

export default new DepartmentRepository();