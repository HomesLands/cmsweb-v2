import { TQueryRequest } from ".";

export type TCreateProductRequestDto = {
  name?: string;
  code?: string;
  provider?: string;
  unit?: string;
  description?: string;
  quantity?: number;
};

export type TUpdateProductRequestDto = {
  slug?: string;
  name?: string;
  quantity?: number;
  code?: string;
  provider?: string;
  rfid?: string;
  unit?: string;
  description?: string;
};

export type TProductQueryRequest = TQueryRequest & {
  searchTerm: string;
};
