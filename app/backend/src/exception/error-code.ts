import { StatusCodes } from "http-status-codes";
import { IStatusResponse } from "@types";

export const StatusResponseRecord: Record<string, IStatusResponse> = {
  INVALID_EMAIL: {
    code: StatusCodes.BAD_REQUEST,
    message: "Email is not valid",
  },
  PATH_NOT_FOUND: {
    code: StatusCodes.NOT_FOUND,
    message: "Can't find path",
  },
  INVALID_USERNAME: {
    code: StatusCodes.BAD_REQUEST,
    message: "username is not valid",
  },
  USER_ID_NOT_FOUND: {
    code: StatusCodes.BAD_REQUEST,
    message: "User id not found",
  },
  USER_NOT_FOUND: {
    code: StatusCodes.UNAUTHORIZED,
    message: "User not found",
  },
  SESSION_STORE_ERROR: {
    code: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "Fail in store session when login",
  },
  UNAUTHORIZED: {
    code: StatusCodes.UNAUTHORIZED,
    message: "Unauthorized",
  },
  INTERNAL_SERVER_ERROR: {
    code: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "Internal Server Error",
  },
};
