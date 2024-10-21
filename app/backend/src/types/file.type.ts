export type TFileData = {
  data?: Buffer;
  name?: string;
  mimetype?: string;
  extension?: string;
  length?: number;
};

export type TFileResponseDto = {
  filename: string;
  buffer: unknown;
};
