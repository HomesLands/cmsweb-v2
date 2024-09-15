import { StatusCodes } from "http-status-codes";
import type { TErrorCode } from "@types";

export const ErrorCodes: TErrorCode = {
  INVALID_EMAIL: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1001,
    message: "Email is not valid",
  },
  PATH_NOT_FOUND: {
    httpStatusCode: StatusCodes.NOT_FOUND,
    code: 1002,
    message: "Can not find path",
  },
  INVALID_USERNAME: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1003,
    message: "Username is not valid",
  },
  USER_NOT_FOUND: {
    httpStatusCode: StatusCodes.UNAUTHORIZED,
    code: 1004,
    message: "User not found",
  },
  SESSION_STORE_ERROR: {
    httpStatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    code: 1005,
    message: "Fail in store session when login",
  },
  USER_EXIST: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1006,
    message: "User exist",
  },
  UNIDENTIFIED_ERROR: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1007,
    message: "Unindentified error",
  },
  INVALID_PASSWORD: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1008,
    message: "Password is not valid",
  },
  INVALID_FIRSTNAME: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1009,
    message: "Firstname is not valid",
  },
  INVALID_LASTNAME: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1010,
    message: "Lastname is not valid",
  },
  INVALID_FULLNAME: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1011,
    message: "Fullname is not valid",
  },
  INVALID_TOKEN: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1012,
    message: "Token is not valid",
  },
  INVALID_JWT_PAYLOAD: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1013,
    message: "Jwt payload is not valid",
  },
  TOKEN_NOT_EXPIRED: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1014,
    message: "Token is not expired",
  },
  SUBJECT_NOT_EXIST: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1015,
    message: "Subject is not exist",
  },
  REFRESH_TOKEN_EXPIRED: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1016,
    message: "Refresh token expired, cannot create new token.",
  },
  USER_ASSIGNED_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1017,
    message: "User is assigned not found",
  },
};
