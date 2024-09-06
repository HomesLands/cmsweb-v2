export type TEnv = {
  port: string;
  dataSource: {
    hostMySql: string;
    userMySql: string;
    passwordMySql: string;
    databaseMySql: string;
  };
  hashSalt: string;
  jwtSecret: string;
  passportSecret: string;
};

export type TApiResponse<T> = {
  result?: T;
  code: number;
  message: string;
  error: boolean;
  method: string;
  path: string;
};

// export interface IPageOption {
//   builderFor: string;
//   orderBy: string;
//   skip: number;
//   take: number;
// }

export type TErrorCodeValue = {
  code: number;
  message: string;
  httpStatusCode: number;
};

export type TErrorCode = Record<string, TErrorCodeValue>;

export * from "./auth.type";
