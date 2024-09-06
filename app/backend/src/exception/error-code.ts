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
};
