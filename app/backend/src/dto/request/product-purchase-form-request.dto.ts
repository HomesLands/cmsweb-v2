import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { 
  CreatePurchaseProductFromRequisitionFormRequestDto,
  CreatePurchaseProductWithoutRequisitionFormRequestDto,
} from "./purchase-product-request.dto";
import { Expose, Type } from "class-transformer";
import { AutoMap } from "@automapper/classes";

export class CreateProductPurchaseFormWithoutProductRequisitionFormRequestDto {
  @IsNotEmpty({ message: "INVALID_FORM_CODE" })
  @Expose()
  @AutoMap()
  code: string;

  @IsOptional()
  @Expose()
  @AutoMap()
  description?: string;

  @IsArray({ message: "INVALID_PURCHASE_PRODUCT_ARRAY" })
  @ArrayNotEmpty({ message: "INVALID_PURCHASE_PRODUCT_ARRAY" })
  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseProductWithoutRequisitionFormRequestDto)
  @Expose()
  purchaseProducts: CreatePurchaseProductWithoutRequisitionFormRequestDto[];
}
export class CreateProductPurchaseFormFromProductRequisitionFormRequestDto {
  @IsNotEmpty({ message: "INVALID_FORM_CODE" })
  @Expose()
  @AutoMap()
  code?: string;

  @IsOptional()
  @Expose()
  @AutoMap()
  description?: string;

  @IsNotEmpty({ message: "INVALID_PRODUCT_REQUISITION_FORM_SLUG" })
  @Expose()
  @AutoMap()
  productRequisitionForm?: string;

  @IsArray({ message: "INVALID_PURCHASE_PRODUCT_ARRAY" })
  @ArrayNotEmpty({ message: "INVALID_PURCHASE_PRODUCT_ARRAY" })
  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseProductFromRequisitionFormRequestDto)
  @Expose()
  purchaseProducts: CreatePurchaseProductFromRequisitionFormRequestDto[];
}