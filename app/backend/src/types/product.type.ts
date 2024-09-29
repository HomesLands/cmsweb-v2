import { TQueryRequest } from "./base.type";

export type TCreateProductRequestDto = {
  name?: string;
  code?: string;
  provider?: string;
  description?: string;
  unit?: string;
};

export type TUpdateProductRequestDto = {
  slug?: string;
  name?: string;
  code?: string;
  provider?: string;
  description?: string;
  unit?: string;
};

export type TProductQueryRequest = TQueryRequest & {
  searchTerm: string;
};
