export type TCreateCompanyRequestDto = {
  name?: string;
};

export type TUpdateCompanyRequestDto = {
  name?: string;
  slug?: string;
};

export type TUploadCompanyLogoRequestDto = {
  slug?: string;
  file?: Express.Multer.File;
};
