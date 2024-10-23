import { IsNotEmpty, IsEnum, IsOptional } from "class-validator";
import { Expose } from "class-transformer";
import { AutoMap } from "@automapper/classes";
import { RoleApproval, FormApprovalType } from "@enums";

export class GetAssignedUserApprovalRequestDto {
  @IsOptional()
  @IsEnum(FormApprovalType, { message: "INVALID_FORM_TYPE" })
  @Expose()
  @AutoMap()
  formType?: string;

  @IsOptional()
  @IsEnum(RoleApproval, { message: "INVALID_ROLE_APPROVAL" })
  @Expose()
  @AutoMap()
  roleApproval?: string;

  @IsOptional()
  @Expose()
  @AutoMap()
  site?: string;

  @IsOptional()
  @Expose()
  @AutoMap()
  user?: string;
}
export class CreateAssignedUserApprovalRequestDto {
  @IsNotEmpty({ message: "INVALID_USER_SLUG" })
  @Expose()
  @AutoMap()
  user?: string;

  @IsNotEmpty({ message: "INVALID_FORM_TYPE" })
  @IsEnum(FormApprovalType, { message: "INVALID_FORM_TYPE" })
  @Expose()
  @AutoMap()
  formType?: string;

  @IsNotEmpty({ message: "INVALID_ROLE_APPROVAL" })
  @IsEnum(RoleApproval, { message: "INVALID_ROLE_APPROVAL" })
  @Expose()
  @AutoMap()
  roleApproval?: string;

  @IsNotEmpty({ message: "INVALID_SITE_SLUG" })
  @Expose()
  @AutoMap()
  site?: string;
}

export class UpdateAssignedUserApprovalRequestDto extends CreateAssignedUserApprovalRequestDto {
  slug?: string;
}
