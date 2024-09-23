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
  APPROVAL_USER_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1047,
    message: "Approval user not found",
  },
  USER_OF_APPROVAL_USER_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1048,
    message: "User of approval user not found",
  },
  INVALID_APPROVAL_USER_FOR_APPROVAL_FORM: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1049,
    message: "Invalid approval user for approval form",
  },
  PRODUCT_REQUISITION_FORM_DONE_APPROVAL: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1050,
    message: "Product requisition form done approval",
  },
  SITE_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1051,
    message: "Site not found",
  },
  PROJECT_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1052,
    message: "Project not found",
  },
  INVALID_CREATOR: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1053,
    message: "Invalid creator",
  },
  INVALID_APPROVAL_STATUS: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1054,
    message: "Invalid approval status",
  },
  INVALID_CONTENT_APPROVAL_LOG: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1055,
    message: "Invalid content approval log",
  },
  INVALID_CODE_FORM: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1056,
    message: "Invalid code form",
  },
  INVALID_TYPE_PRODUCT_REQUISITION_FORM: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1057,
    message: "Invalid type of product requisition form",
  },
  INVALID_COMPANY_SLUG: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1058,
    message: "Invalid company slug",
  },
  INVALID_SITE_SLUG: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1059,
    message: "Invalid site slug",
  },
  INVALID_PROJECT_SLUG: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1060,
    message: "Invalid project slug",
  },
  INVALID_REQUEST_PRODUCT_ARRAY: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1061,
    message: "Invalid request product array",
  },
  INVALID_APPROVAL_USER_ARRAY: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1062,
    message: "Invalid approval user array",
  },
  INVALID_FORM_SLUG: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1063,
    message: "Invalid form slug",
  },
  INVALID_APPROVAL_USER_SLUG: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1064,
    message: "Invalid approval user slug",
  },
  INVALID_PRODUCT_SLUG: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1065,
    message: "Invalid product slug",
  },
  INVALID_REQUEST_PRODUCT_QUANTITY: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1066,
    message: "Invalid request product quantity",
  },
  INVALID_USER_SLUG_IN_USER_APPROVAL: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1067,
    message: "Invalid user slug in user approval",
  },
  INVALID_ROLE_APPROVAL: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1068,
    message: "Invalid role approval",
  },
  MISSING_USER_APPROVAL: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1069,
    message: "Missing user approval",
  },
  ROLE_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1070,
    message: "Authority could not be found",
  },
  AUTHORITY_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1071,
    message: "Authority could not be found",
  },
  PERMISSION_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1072,
    message: "Authority could not be found",
  },
  USER_ROLE_EXIST: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1072,
    message: "User role is existed",
  },
  PERMISSION_EXIST: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1073,
    message: "Permission is existed",
  },
  INVALID_COMPANY_DIRECTOR: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1074,
    message: "Invalid company director",
  },
  COMPANY_DIRECTOR_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1075,
    message: "Company director not found",
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
