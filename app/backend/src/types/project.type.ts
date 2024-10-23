export type TCreateProjectRequestDto = {
  name?: string;
  startDate?: string;
  description?: string;
  fileDescription?: string;
  site?: string;
};

export type TUpdateProjectRequestDto = {
  slug?: string;
  name?: string;
  startDate?: string;
  description?: string;
  fileDescription?: string;
  site?: string;
};
