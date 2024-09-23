import BaseRepository from "./base.repository";
import { dataSource } from "@configs";
import { Permission } from "@entities";

class PermissionRepository extends BaseRepository<Permission> {
  constructor() {
    super(Permission, dataSource);
  }
}

export default new PermissionRepository();
