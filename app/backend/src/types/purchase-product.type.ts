export type TCreatePurchaseProductFromWithoutRequisitionFormRequestDto = {
  purchaseQuantity?: number;
  product?: string;
  temporaryProduct?: string;

  // if product not exist in db
  name?: string;
  provider?: string;
  unit?: string; // slug
  description?: string;
}

export type TCreatePurchaseProductFromRequisitionFormRequestDto = {
  purchaseQuantity?: number;
  product?: string;
  temporaryProduct?: string;
}