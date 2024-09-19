import { AutoMap } from "@automapper/classes";
import { ApprovalLogResponseDto } from "@dto/response";

export class UserApprovalResponseDto {
  userSlug?: string;

  userFullname?: string;

  @AutoMap()
  roleApproval?: string;

  @AutoMap(() => [ApprovalLogResponseDto])
  approvalLogs?: ApprovalLogResponseDto[];
}