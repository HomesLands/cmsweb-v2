export type TChangeQuantityRequestProductRequestDto = {
  slug?: string;
  newQuantity?: number;
}

export type TAddNewRequestProductRequestDto = {
  form?: string;
  product?: string;
  requestQuantity?: number;

  // product not exist
  name?: string;
  provider?: string;
  unit?: string; // slug
  description?: string;
}

export type TCreateRequestProductRequestDto = {
  product?: string; // slug
  requestQuantity?: number;

  // product not exist
  name?: string;
  provider?: string;
  unit?: string; // slug
  description?: string;
}