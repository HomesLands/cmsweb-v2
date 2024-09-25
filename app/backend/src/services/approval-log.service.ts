import { CreateApprovalLogRequestDto } from "@dto/request";

class ApprovalLogService {
  public async createApprovalLog(
    requestData: CreateApprovalLogRequestDto
  ): Promise<void> {}
}

export default new ApprovalLogService();
