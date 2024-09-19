import { TQueryRequest } from ".";

export type TCreateProductRequestDto = {
  name?: string;
  code?: string;
  provider?: string;
  unit?: string;
  description?: string;
};

export type TProductQueryRequest = TQueryRequest & {
  searchTerm: string;
};
