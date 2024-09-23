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
  productSlug?: string;
  requestQuantity?: number;
}