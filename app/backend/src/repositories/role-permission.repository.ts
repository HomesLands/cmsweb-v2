import BaseRepository from "./base.repository";
import { dataSource } from "@configs";
import { RolePermission } from "@entities";

class RolePermissionRepository extends BaseRepository<RolePermission> {
  constructor() {
    super(RolePermission, dataSource);
  }
}

export default new RolePermissionRepository();
