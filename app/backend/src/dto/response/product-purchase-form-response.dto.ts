import { AutoMap } from "@automapper/classes";
import { BaseResponseDto } from "./base-response.dto";
import { PurchaseProductResponseDto } from "./purchase-product-response.dto";
import { ProductRequisitionFormResponseDto } from "./product-requisition-form-response.dto";

export class ProductPurchaseFormResponseDto extends BaseResponseDto {
  @AutoMap()
  code?: string;

  @AutoMap()
  status?: string;

  @AutoMap()
  description?: string;

  @AutoMap(() => [PurchaseProductResponseDto])
  purchaseProduct?: PurchaseProductResponseDto[];

  @AutoMap(() => ProductRequisitionFormResponseDto)
  productRequisitionForm?: ProductRequisitionFormResponseDto;
}