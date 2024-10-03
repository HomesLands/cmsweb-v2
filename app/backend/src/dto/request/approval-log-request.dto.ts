import { Expose } from "class-transformer";
import { IsEnum, IsNotEmpty } from "class-validator";

import { ApprovalLogStatus } from "@enums";
import { AutoMap } from "@automapper/classes";

export class CreateApprovalLogRequestDto {
  @IsNotEmpty({ message: "INVALID_APPROVAL_STATUS" })
  @IsEnum(ApprovalLogStatus, { message: "INVALID_APPROVAL_STATUS" })
  @Expose()
  @AutoMap()
  status?: string;

  @IsNotEmpty({ message: "INVALID_CONTENT_APPROVAL_LOG" })
  @Expose()
  @AutoMap()
  content?: string;
}