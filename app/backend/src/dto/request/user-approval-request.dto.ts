import {
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { AutoMap } from '@automapper/classes';
import { RoleApproval } from "@enums";

export class CreateUserApprovalRequestDto {
  @IsNotEmpty({ message: "INVALID_USER_SLUG_IN_USER_APPROVAL" })
  @Expose()
  @AutoMap()
  userSlug?: string;

  @IsNotEmpty({ message: "INVALID_ROLE_APPROVAL" })
  @IsEnum(RoleApproval, { message: "INVALID_ROLE_APPROVAL" })
  @Expose()
  @AutoMap()
  roleApproval?: string;
}