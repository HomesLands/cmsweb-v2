import { Role } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class RoleRepository extends BaseRepository<Role> {
  constructor() {
    super(Role, dataSource);
  }
}

export default new RoleRepository();
