import { StatusCodes } from "http-status-codes";
import type { TErrorCode } from "@types";

export const ErrorCodes: TErrorCode = {
  // UserInputErrors
  //   code range: [1000 - 3999]
  INVALID_EMAIL: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1001,
    message: "Email is not valid",
  },
  INVALID_USERNAME: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1003,
    message: "Username is not valid",
  },
  INVALID_PASSWORD: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1008,
    message: "Password is not valid",
  },
  INVALID_FULLNAME: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1011,
    message: "Fullname is not valid",
  },
  USER_ASSIGNED_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1022,
    message: "User is assigned not found",
  },
  UNIT_EXIST: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1023,
    message: "Unit exist",
  },
  UNIT_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1024,
    message: "Unit not found",
  },
  CODE_PRODUCT_EXIST: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1025,
    message: "Code product exist",
  },
  INVALID_PRODUCT_PROVIDER: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1026,
    message: "Invalid product provider",
  },
  INVALID_PRODUCT_NAME: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1027,
    message: "Invalid product name",
  },
  INVALID_PRODUCT_UNIT: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1028,
    message: "Invalid product unit",
  },
  INVALID_PRODUCT_CODE: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1029,
    message: "Invalid product code",
  },
  INVALID_SITE_NAME: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1030,
    message: "Invalid site name",
  },
  INVALID_SITE_ADDRESS: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1031,
    message: "Invalid site address",
  },
  INVALID_SITE_MANAGER: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1032,
    message: "Invalid site manager",
  },
  INVALID_PROJECT_NAME: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1033,
    message: "Invalid project name",
  },
  INVALID_PROJECT_START_DATE: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1034,
    message: "Invalid project start date",
  },
  INVALID_PROJECT_PROCESS: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1035,
    message: "Invalid project process",
  },
  INVALID_PROJECT_DESCRIPTION: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1036,
    message: "Invalid project description",
  },
  INVALID_PROJECT_FILE_DESCRIPTION: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1037,
    message: "Invalid project file description",
  },
  INVALID_PROJECT_MANAGER: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1038,
    message: "Invalid project manager",
  },
  INVALID_UNIT_NAME: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1039,
    message: "Invalid unit name",
  },
  INVALID_DATE_FORMAT: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1039,
    message: "Invalid date format",
  },
  INVALID_COMPANY_NAME: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1040,
    message: "Invalid company name",
  },
  COMPANY_NAME_EXIST: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1041,
    message: "Company name exist",
  },
  PRODUCT_REQUISITION_FORM_CODE_EXIST: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1042,
    message: "Product requisition form code exist",
  },
  COMPANY_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1043,
    message: "Company not found",
  },
  INVALID_QUANTITY_USER_APPROVAL: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1044,
    message: "Invalid quantity user approval",
  },
  PRODUCT_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1045,
    message: "Product not found",
  },
  FORM_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1046,
    message: "Form not found",
  },
  MISSING_USER_APPROVAL: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1047,
    message: "Missing user approval",
  },
  AUTHORITY_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1048,
    message: "Authority could not be found",
  },

  // AuthenticationErrors
  // Code range: [4000 - 4099]
  PATH_NOT_FOUND: {
    httpStatusCode: StatusCodes.NOT_FOUND,
    code: 1002,
    message: "Can not find path",
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
  TOKEN_EXPIRED: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1017,
    message: "Token expired.",
  },
  INVALID_REFRESH_TOKEN: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1018,
    message: "Refresh token is not valid",
  },
  IAT_NOT_EXIST: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1019,
    message: "Token iat is not exist",
  },
  TOKEN_ID_NOT_EXIST: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1019,
    message: "Token id is not exist",
  },
  TOKEN_TYPE_NOT_EXIST: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1020,
    message: "Token type is not exist",
  },
  EXP_NOT_EXIST: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1021,
    message: "Token expiration is not exist",
  },
} as const;
