export type TChangeQuantityRequestProductRequestDto = {
  slug?: string;
  newQuantity?: number;
}

export type TAddNewRequestProductRequestDto = {
  productSlug?: string;
  formSlug?: string;
  requestQuantity?: number;
}

export type TCreateRequestProductRequestDto = {
  product?: string;
  requestQuantity?: number;
}