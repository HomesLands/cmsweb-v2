import {
  IsNotEmpty,
  ValidateNested,
  IsArray,
  ArrayNotEmpty,
  IsEnum,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { AutoMap } from '@automapper/classes';
import { ProductRequisitionFormType } from "@enums";
import { CreateRequestProductRequestDto } from "./request-product-request.dto";
import { CreateUserApprovalRequestDto } from "./user-approval-request.dto";

export class CreateProductRequisitionFormRequestDto {
  @IsNotEmpty()
  @Expose()
  @AutoMap()
  code?: string;

  @IsNotEmpty()
  @IsEnum(ProductRequisitionFormType)
  @Expose()
  @AutoMap()
  type?: string;

  @IsNotEmpty()
  @Expose()
  @AutoMap()
  companySlug?: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateRequestProductRequestDto)
  @Expose()
  requestProducts: CreateRequestProductRequestDto[];

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateUserApprovalRequestDto)
  @Expose()
  userApprovals: CreateUserApprovalRequestDto[];
}
