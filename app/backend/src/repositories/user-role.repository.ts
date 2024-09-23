import BaseRepository from "./base.repository";
import { dataSource } from "@configs";
import { UserRole } from "@entities";

class UserRoleRepository extends BaseRepository<UserRole> {
  constructor() {
    super(UserRole, dataSource);
  }
}

export default new UserRoleRepository();
