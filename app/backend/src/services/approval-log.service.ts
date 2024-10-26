import { CreateApprovalLogRequestDto } from "@dto/request";
import { ApprovalLogResponseDto } from "@dto/response";
import { ApprovalLog, UserApproval } from "@entities";
import { mapper } from "@mappers";
import approvalLogRepository from "@repositories/approval-log.repository";

class ApprovalLogService {
  public async createApprovalLog(
    requestData?: CreateApprovalLogRequestDto,
    userApproval?: UserApproval
  ) {
    const approvalLog = mapper.map(
      requestData,
      CreateApprovalLogRequestDto,
      ApprovalLog
    );

    Object.assign(approvalLog, { userApproval });
    const created = await approvalLogRepository.createAndSave(approvalLog);

    return mapper.map(created, ApprovalLog, ApprovalLogResponseDto);
  }
}

export default new ApprovalLogService();
