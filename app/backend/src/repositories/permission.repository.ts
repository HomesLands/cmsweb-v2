import BaseRepository from "./base.repository";
import { dataSource } from "@configs";
import { Permission } from "@entities";

class RoleRepository extends BaseRepository<Permission> {
  constructor() {
    super(Permission, dataSource);
  }
}

export default new RoleRepository();
