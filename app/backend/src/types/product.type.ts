import { TQueryRequest } from ".";

export type TCreateProductRequestDto = {
  name?: string;
  code?: string;
  provider?: string;
  description?: string;
  quantity?: number;
};

export type TUpdateProductRequestDto = {
  slug?: string;
  name?: string;
  quantity?: number;
  code?: string;
  provider?: string;
  description?: string;
};

export type TProductQueryRequest = TQueryRequest & {
  searchTerm: string;
};
