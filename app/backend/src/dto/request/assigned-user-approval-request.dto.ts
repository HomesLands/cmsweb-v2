import {
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { AutoMap } from '@automapper/classes';
import {
  RoleApproval,
  FormApprovalType
} from "@enums";

export class CreateAssignedUserApprovalRequestDto {
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

  @IsNotEmpty({ message: "INVALID_USER_SLUG" })
  @Expose()
  @AutoMap()
  user?: string;
}

