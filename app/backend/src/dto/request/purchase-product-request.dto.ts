import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, Min, ValidateIf } from "class-validator";

export class CreatePurchaseProductWithoutRequisitionFormRequestDto {
  // @IsNotEmpty({ message: "INVALID_PRODUCT_SLUG" })
  @IsOptional()
  @Expose()
  @AutoMap()
  product?: string;

  // @IsNotEmpty({ message: "INVALID_PRODUCT_SLUG" })
  @IsOptional()
  @Expose()
  @AutoMap()
  temporaryProduct?: string;

  @IsNotEmpty({ message: "INVALID_PURCHASE_PRODUCT_QUANTITY" })
  @Min(1, { message: "INVALID_PURCHASE_PRODUCT_QUANTITY"})
  @Expose()
  @AutoMap()
  purchaseQuantity?: number;

  @IsNotEmpty({ message: "INVALID_PRODUCT_NAME" })
  @Expose()
  @AutoMap()
  name?: string;

  @IsNotEmpty({ message: "INVALID_PRODUCT_PROVIDER" })
  @Expose()
  @AutoMap()
  provider?: string;

  @IsNotEmpty({ message: "INVALID_UNIT_SLUG" })
  @Expose()
  @AutoMap()
  unit?: string;

  @IsNotEmpty({ message: "INVALID_PRODUCT_DESCRIPTION" })
  @Expose()
  @AutoMap()
  description?: string;
}
export class CreatePurchaseProductFromRequisitionFormRequestDto {
  @ValidateIf(o => !o.temporaryProduct)
  @IsNotEmpty({ message: "INVALID_PRODUCT_SLUG" })
  @Expose()
  @AutoMap()
  product?: string;

  @ValidateIf(o => !o.product)
  @IsNotEmpty({ message: "INVALID_TEMPORARY_PRODUCT_SLUG" })
  @Expose()
  @AutoMap()
  temporaryProduct?: string;

  @IsNotEmpty({ message: "INVALID_PURCHASE_PRODUCT_QUANTITY" })
  @Min(1, { message: "INVALID_PURCHASE_PRODUCT_QUANTITY"})
  @Expose()
  @AutoMap()
  purchaseQuantity?: number;
}