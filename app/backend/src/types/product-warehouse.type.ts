export type TCreateProductWarehouseRequestDto = {
  quantity?: string;
  warehouse?: string;
  product?: string;
};

export type TUploadProductRequestDto = {
  file?: Express.Multer.File;
};
