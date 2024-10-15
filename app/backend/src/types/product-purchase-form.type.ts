import { TCreatePurchaseProductRequestDto } from "./purchase-product.type";

export type TCreateProductPurchaseFormRequestDto = {
  code?: string;
  description?: string;
  productRequisitionForm?: string;
  purchaseProducts: TCreatePurchaseProductRequestDto[]
}