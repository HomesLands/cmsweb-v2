import {
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { AutoMap } from '@automapper/classes';
import { RoleApproval } from "@enums";

export class CreateUserApprovalRequestDto {
  @IsNotEmpty()
  @Expose()
  @AutoMap()
  userSlug?: string;

  @IsNotEmpty()
  @IsEnum(RoleApproval)
  @Expose()
  @AutoMap()
  roleApproval?: string;
}