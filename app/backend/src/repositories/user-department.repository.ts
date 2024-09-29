import { UserDepartment } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class UserDepartmentRepository extends BaseRepository<UserDepartment> {
  constructor() {
    super(UserDepartment, dataSource);
  }
}

export default new UserDepartmentRepository();