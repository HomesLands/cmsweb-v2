export type TApiResponse<T> = {
  result?: T;
  code: number;
  message: string;
  error: boolean;
  method: string;
  path: string;
};

export type TQueryRequest = {
  page: number;
  order: "ASC" | "DESC";
  pageSize: number;
};

export type TPaginationOptionResponse<T> = {
  page: number;
  pageSize: number;
  totalPages: number;
  items: T;
};
