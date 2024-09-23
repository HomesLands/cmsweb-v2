import { Expose } from "class-transformer";
import { IsEnum, IsNotEmpty } from "class-validator";

import { ApprovalLogStatus } from "@enums";

export class CreateApprovalLogRequestDto {
  @IsNotEmpty({ message: "INVALID_APPROVAL_STATUS" })
  @IsEnum(ApprovalLogStatus, { message: "INVALID_APPROVAL_STATUS" })
  @Expose()
  approvalLogStatus?: string;

  @IsNotEmpty({ message: "INVALID_CONTENT_APPROVAL_LOG" })
  @Expose()
  approvalLogContent?: string;
}