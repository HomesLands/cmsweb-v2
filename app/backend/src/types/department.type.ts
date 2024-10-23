export type TCreateDepartmentRequestDto = {
  nameNormalize?: string;
  description?: string;
  site?: string;
};

export type TUpdateDepartmentRequestDto = {
  slug?: string;
  nameNormalize?: string;
  description?: string;
  site?: string;
};
