import { UserApproval } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class UserApprovalRepository extends BaseRepository<UserApproval> {
  constructor() {
    super(UserApproval, dataSource);
  }
}

export default new UserApprovalRepository();