import { 
  TCreatePurchaseProductFromWithoutRequisitionFormRequestDto,
  TCreatePurchaseProductFromRequisitionFormRequestDto,
 } from "./purchase-product.type";

export type TCreateProductPurchaseFormWithoutProductRequisitionFormRequestDto = {
  code?: string;
  description?: string;
  purchaseProducts: TCreatePurchaseProductFromWithoutRequisitionFormRequestDto[]
}
export type TCreateProductPurchaseFormFromProductRequisitionFormRequestDto = {
  code?: string;
  description?: string;
  productRequisitionForm?: string;
  purchaseProducts: TCreatePurchaseProductFromRequisitionFormRequestDto[]
}