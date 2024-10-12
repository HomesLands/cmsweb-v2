export type TAddNewRequestProductRequestDto = {
  form?: string;
  product?: string;
  requestQuantity?: number;

  // product not exist
  name?: string;
  provider?: string;
  unit?: string; // slug
  description?: string;
};

export type TCreateRequestProductRequestDto = {
  product?: string; // slug
  requestQuantity?: number;
  name?: string;
  provider?: string;
  unit?: string; // slug
  description?: string;
};

export type TUpdateRequestProductRequestDto = {
  requestQuantity?: number;
  name?: string;
  provider?: string;
  unit?: string; // slug
  description?: string;
};
