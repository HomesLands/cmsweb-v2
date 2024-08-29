import { StatusCodes } from "http-status-codes";

export enum StatusCode {
  USER_NOT_FOUND = 1001,
  INVALID_EMAIL,
  INVALID_USER_NAME,
  USER_ID_NOT_FOUND,
  SESSION_STORE_ERROR,
  UNAUTHORIZED,
}

export const StatusMessage = {
  [StatusCode.INVALID_EMAIL]: "Email is not valid",
  [StatusCode.INVALID_USER_NAME]: "User name is not valid",
  [StatusCode.USER_NOT_FOUND]: "User not found",
  [StatusCode.USER_ID_NOT_FOUND]: "User id not found in database",
  [StatusCode.SESSION_STORE_ERROR]: "Fail in store session when login",
  [StatusCode.UNAUTHORIZED]: "Unauthorized",
};

export const StatusCodeToHttpStatus: Record<StatusCode, number> = {
  [StatusCode.INVALID_EMAIL]: StatusCodes.BAD_REQUEST,
  [StatusCode.INVALID_USER_NAME]: StatusCodes.BAD_REQUEST,
  [StatusCode.USER_NOT_FOUND]: StatusCodes.UNAUTHORIZED,
  [StatusCode.USER_ID_NOT_FOUND]: StatusCodes.BAD_REQUEST,
  [StatusCode.SESSION_STORE_ERROR]: StatusCodes.INTERNAL_SERVER_ERROR,
  [StatusCode.UNAUTHORIZED]: StatusCodes.UNAUTHORIZED,
};
