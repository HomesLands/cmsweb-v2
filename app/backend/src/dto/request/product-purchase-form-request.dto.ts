import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { CreatePurchaseProductRequestDto } from "./purchase-product-request.dto";
import { Expose, Type } from "class-transformer";
import { AutoMap } from "@automapper/classes";

export class CreateProductPurchaseFormRequestDto {
  @IsNotEmpty({ message: "INVALID_FORM_CODE" })
  @Expose()
  @AutoMap()
  code?: string;

  @IsOptional()
  @Expose()
  @AutoMap()
  description?: string;

  @IsOptional()
  @Expose()
  @AutoMap()
  productRequisitionForm?: string;

  @IsArray({ message: "INVALID_PURCHASE_PRODUCT_ARRAY" })
  @ArrayNotEmpty({ message: "INVALID_PURCHASE_PRODUCT_ARRAY" })
  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseProductRequestDto)
  @Expose()
  purchaseProducts: CreatePurchaseProductRequestDto[];
}