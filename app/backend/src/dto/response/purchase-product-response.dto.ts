import { AutoMap } from "@automapper/classes";
import { BaseResponseDto } from "./base-response.dto";
import { ProductResponseDto } from "./product-response.dto";
import { TemporaryProductResponseDto } from "./temporary-response.dto";

export class PurchaseProductResponseDto extends BaseResponseDto {
  @AutoMap()
  purchaseQuantity?: number;

  @AutoMap()
  description?: string;

  @AutoMap()
  isExistProduct?: boolean;

  @AutoMap(() => ProductResponseDto)
  product?: ProductResponseDto;

  @AutoMap(() => TemporaryProductResponseDto)
  temporaryProduct?: TemporaryProductResponseDto;
}