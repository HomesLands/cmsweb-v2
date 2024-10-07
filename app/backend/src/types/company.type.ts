export type TCreateCompanyRequestDto = {
  name?: string;
};

export type TUploadCompanyLogoRequestDto = {
  slug?: string;
  file?: Express.Multer.File;
};
