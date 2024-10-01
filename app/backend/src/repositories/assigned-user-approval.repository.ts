import { AssignedUserApproval } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class AssignedUserApprovalRepository extends BaseRepository<AssignedUserApproval> {
  constructor() {
    super(AssignedUserApproval, dataSource);
  }
}

export default new AssignedUserApprovalRepository();