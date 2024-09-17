export type TEnv = {
  port: number;
  dataSource: {
    hostMySql: string;
    userMySql: string;
    passwordMySql: string;
    databaseMySql: string;
  };
  hashSalt: string;
  jwtSecret: string;
  passportSecret: string;
  duration: number;
  refreshableDuration: number;
};

export type TApiResponse<T> = {
  result?: T;
  code: number;
  message: string;
  error: boolean;
  method: string;
  path: string;
};

export type TPaginationOption = {
  skip: number;
  order: "ASC" | "DESC";
  take: number;
};

export type TErrorCodeKey =
  | "INVALID_EMAIL"
  | "PATH_NOT_FOUND"
  | "INVALID_USERNAME"
  | "USER_NOT_FOUND"
  | "SESSION_STORE_ERROR"
  | "USER_EXIST"
  | "UNIDENTIFIED_ERROR"
  | "INVALID_PASSWORD"
  | "INVALID_FULLNAME"
  | "INVALID_TOKEN"
  | "INVALID_JWT_PAYLOAD"
  | "TOKEN_NOT_EXPIRED"
  | "SUBJECT_NOT_EXIST"
  | "REFRESH_TOKEN_EXPIRED"
  | "TOKEN_EXPIRED"
  | "INVALID_REFRESH_TOKEN"
  | "IAT_NOT_EXIST"
  | "TOKEN_ID_NOT_EXIST"
  | "TOKEN_TYPE_NOT_EXIST"
  | "USER_ASSIGNED_NOT_FOUND"
  | "EXP_NOT_EXIST";

export type TErrorCodeValue = {
  code: number;
  message: string;
  httpStatusCode: number;
};

export type TErrorCode = Record<TErrorCodeKey, TErrorCodeValue>;

export * from "./auth.type";
export * from "./site.type";
export * from "./project.type";
