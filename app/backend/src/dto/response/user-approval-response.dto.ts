import { AutoMap } from "@automapper/classes";
import {
  ApprovalLogResponseDto,
  ProductRequisitionFormResponseDto,
} from "@dto/response";

export class UserApprovalResponseDto {
  userSlug?: string;

  userFullname?: string;

  @AutoMap()
  roleApproval?: string;

  @AutoMap(() => [ApprovalLogResponseDto])
  approvalLogs?: ApprovalLogResponseDto[];
}

export class UserApprovalForApprovalUserResponseDto {
  @AutoMap()
  roleApproval?: string;

  approvalUserSlug?: string;

  @AutoMap(() => ProductRequisitionFormResponseDto)
  productRequisitionForm?: ProductRequisitionFormResponseDto;
}