import { AutoMap } from "@automapper/classes";
import {
  ApprovalLogResponseDto,
  ProductRequisitionFormResponseDto,
  AssignedUserApprovalResponseDto,
} from "@dto/response";

export class UserApprovalResponseDto {
  userSlug?: string;

  userFullname?: string;

  @AutoMap()
  roleApproval?: string;

  @AutoMap(() => [ApprovalLogResponseDto])
  approvalLogs?: ApprovalLogResponseDto[];

  @AutoMap(() => [AssignedUserApprovalResponseDto])
  assignedUserApproval?: AssignedUserApprovalResponseDto[];
}

export class UserApprovalFormResponseDto {
  roleApproval?: string;

  approvalUserSlug?: string;

  @AutoMap(() => ProductRequisitionFormResponseDto)
  productRequisitionForm?: ProductRequisitionFormResponseDto;
}
