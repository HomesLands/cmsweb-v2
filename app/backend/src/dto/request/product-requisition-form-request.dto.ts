import {
  IsNotEmpty,
  ValidateNested,
  IsArray,
  ArrayNotEmpty,
  IsEnum,
  IsOptional,
} from "class-validator";
import { Expose, Type } from "class-transformer";
import { AutoMap } from "@automapper/classes";
import { ProductRequisitionFormType } from "@enums";
import {
  CreateRequestProductRequestDto,
  CreateApprovalLogRequestDto,
} from "@dto/request";
import { IsDateStringWithMessage } from "decorator";

export class CreateProductRequisitionFormRequestDto {
  @IsNotEmpty({ message: "INVALID_FORM_CODE" })
  @Expose()
  @AutoMap()
  code?: string;

  // @IsNotEmpty({ message: "INVALID_PROJECT_SLUG" })
  // @Expose()
  // @AutoMap()
  // project?: string;

  @IsNotEmpty({ message: "INVALID_PROJECT_SLUG" })
  @Expose()
  @AutoMap()
  projectName?: string;

  @IsNotEmpty({ message: "INVALID_TYPE_PRODUCT_REQUISITION_FORM" })
  @IsEnum(ProductRequisitionFormType, {
    message: "INVALID_TYPE_PRODUCT_REQUISITION_FORM",
  })
  @Expose()
  @AutoMap()
  type?: string;

  @IsNotEmpty({ message: "INVALID_DEADLINE_DATE_APPROVAL_FORM" })
  @IsDateStringWithMessage({ message: "INVALID_DATE_FORMAT" })
  @Expose()
  deadlineApproval?: string;

  @IsOptional()
  @Expose()
  @AutoMap()
  description?: string;

  @IsArray({ message: "INVALID_REQUEST_PRODUCT_ARRAY" })
  @ArrayNotEmpty({ message: "INVALID_REQUEST_PRODUCT_ARRAY" })
  @ValidateNested({ each: true })
  @Type(() => CreateRequestProductRequestDto)
  @Expose()
  requestProducts: CreateRequestProductRequestDto[];

  @Expose()
  creatorId?: string;

  @IsNotEmpty({ message: "INVALID_DEPARTMENT_SLUG" })
  @Expose()
  departmentSlug?: string;
}

export class ApprovalProductRequisitionFormRequestDto {
  @IsNotEmpty({ message: "INVALID_FORM_SLUG" })
  @Expose()
  @AutoMap()
  formSlug?: string;

  @AutoMap()
  @Expose()
  @ValidateNested()
  @Type(() => CreateApprovalLogRequestDto)
  approvalLog?: CreateApprovalLogRequestDto;
}

export class ResubmitProductRequisitionFormRequestDto {
  @IsNotEmpty({ message: "INVALID_FORM_SLUG" })
  @Expose()
  @AutoMap()
  slug?: string;

  @IsNotEmpty({ message: "INVALID_REASON_RESUBMIT_FORM" })
  @Expose()
  @AutoMap()
  description?: string;
}

export class UpdateGeneralInformationProductRequisitionFormRequestDto {
  // @IsNotEmpty({ message: "INVALID_PROJECT_SLUG" })
  // @Expose()
  // @AutoMap()
  // project?: string;

  @IsNotEmpty({ message: "INVALID_PROJECT_NAME" })
  @Expose()
  @AutoMap()
  projectName?: string;

  @IsNotEmpty({ message: "INVALID_TYPE_PRODUCT_REQUISITION_FORM" })
  @IsEnum(ProductRequisitionFormType, {
    message: "INVALID_TYPE_PRODUCT_REQUISITION_FORM",
  })
  @Expose()
  @AutoMap()
  type?: string;

  @IsNotEmpty({ message: "INVALID_DEADLINE_DATE_APPROVAL_FORM" })
  @IsDateStringWithMessage({ message: "INVALID_DATE_FORMAT" })
  @Expose()
  deadlineApproval?: string;

  @IsNotEmpty({ message: "INVALID_FORM_DESCRIPTION" })
  @Expose()
  @AutoMap()
  description?: string;
}
