import {
  IsNotEmpty,
  ValidateNested,
  IsArray,
  ArrayNotEmpty,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { AutoMap } from '@automapper/classes';
import {
  ProductRequisitionFormType,
  ApprovalLogStatus,
} from "@enums";
import {
  CreateRequestProductRequestDto,
  ResubmitRequestProductRequestDto,
} from "./request-product-request.dto";
import { CreateUserApprovalRequestDto } from "./user-approval-request.dto";

export class CreateProductRequisitionFormRequestDto {
  @IsNotEmpty({ message: "INVALID_CODE_FORM" })
  @Expose()
  @AutoMap()
  code?: string;

  @IsNotEmpty({ message: "INVALID_TYPE_PRODUCT_REQUISITION_FORM" })
  @IsEnum(ProductRequisitionFormType, { message: "INVALID_TYPE_PRODUCT_REQUISITION_FORM" })
  @Expose()
  @AutoMap()
  type?: string;

  @IsNotEmpty({ message: "INVALID_COMPANY_SLUG" })
  @Expose()
  @AutoMap()
  companySlug?: string;

  @IsNotEmpty({ message: "INVALID_SITE_SLUG" })
  @Expose()
  @AutoMap()
  siteSlug?: string;

  @IsNotEmpty({ message: "INVALID_PROJECT_SLUG" })
  @Expose()
  @AutoMap()
  projectSlug?: string;

  @IsArray({ message: "INVALID_REQUEST_PRODUCT_ARRAY"})
  @ArrayNotEmpty({ message: "INVALID_REQUEST_PRODUCT_ARRAY"})
  @ValidateNested({ each: true })
  @Type(() => CreateRequestProductRequestDto)
  @Expose()
  requestProducts: CreateRequestProductRequestDto[];

  @IsArray({ message: "INVALID_APPROVAL_USER_ARRAY"})
  @ArrayNotEmpty({ message: "INVALID_APPROVAL_USER_ARRAY"})
  @ValidateNested({ each: true })
  @Type(() => CreateUserApprovalRequestDto)
  @Expose()
  userApprovals: CreateUserApprovalRequestDto[];

  @IsOptional()
  @Expose()
  @AutoMap()
  description?: string;  
}

export class ApprovalProductRequisitionFormRequestDto {
  @IsNotEmpty({ message: "INVALID_FORM_SLUG" })
  @Expose()
  @AutoMap()
  formSlug?: string;

  @IsNotEmpty({ message: "INVALID_APPROVAL_STATUS" })
  @IsEnum(ApprovalLogStatus, { message: "INVALID_APPROVAL_STATUS" })
  @Expose()
  @AutoMap()
  approvalLogStatus?: string;

  @IsNotEmpty({ message: "INVALID_APPROVAL_USER_SLUG" })
  @Expose()
  @AutoMap()
  approvalUserSlug?: string;

  @IsNotEmpty({ message: "INVALID_CONTENT_APPROVAL_LOG" })
  @Expose()
  @AutoMap()
  approvalLogContent?: string;  
}

export class ResubmitProductRequisitionFormRequestDto {
  @IsNotEmpty({ message: "INVALID_FORM_SLUG" })
  @Expose()
  @AutoMap()
  formSlug?: string;

  @IsArray({ message: "INVALID_REQUEST_PRODUCT_ARRAY"})
  @ArrayNotEmpty({ message: "INVALID_REQUEST_PRODUCT_ARRAY"})
  @ValidateNested({ each: true })
  @Type(() => ResubmitRequestProductRequestDto)
  @Expose()
  requestProducts: ResubmitRequestProductRequestDto[];

  @IsOptional()
  @Expose()
  @AutoMap()
  description?: string;
}
