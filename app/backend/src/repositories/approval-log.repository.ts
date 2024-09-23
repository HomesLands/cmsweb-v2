import { ApprovalLog } from "@entities";
import BaseRepository from "./base.repository";
import { dataSource } from "@configs";

class ApprovalLogRepository extends BaseRepository<ApprovalLog> {
  constructor() {
    super(ApprovalLog, dataSource);
  }
}

export default new ApprovalLogRepository();