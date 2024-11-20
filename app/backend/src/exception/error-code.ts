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
    message: `Unit existed`,
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
  USER_APPROVAL_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1048,
    message: "Approval user not found",
  },
  INVALID_USER_APPROVAL: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1049,
    message: "Invalid approval user for approval form",
  },
  INVALID_FORM_STATUS_TRANSITION: {
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
  INVALID_FORM_CODE: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1056,
    message: "Invalid form code",
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
  INVALID_ASSIGNED_USER_APPROVAL: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1067,
    message: "Invalid assigned user approval",
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
    message: "Role could not be found",
  },
  AUTHORITY_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1071,
    message: "Authority could not be found",
  },
  PERMISSION_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1072,
    message: "Permission could not be found",
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
  INVALID_REQUEST_PRODUCT_SLUG: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1073,
    message: "Invalid request product slug",
  },
  REQUEST_PRODUCT_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1074,
    message: "Request product not found",
  },
  CAN_NOT_EDIT_FORM: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1075,
    message: "Can not edit form",
  },
  REQUEST_PRODUCT_EXIST: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1076,
    message: "Request product existed",
  },
  INVALID_REASON_RESUBMIT_FORM: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1077,
    message: "Invalid reason resubmit form",
  },
  INVALID_QUANTITY_PRODUCT: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1078,
    message: "Invalid quantity product",
  },
  CREATOR_FORM_NOT_FORM: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1079,
    message: "Invalid reason resubmit form",
  },
  INVALID_USER_SLUG: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1080,
    message: "Invalid user slug",
  },
  INVALID_DEPARTMENT_SLUG: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1081,
    message: "Invalid department slug",
  },
  DEPARTMENT_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1082,
    message: "Department not found",
  },
  INVALID_FORM_TYPE: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1083,
    message: "Invalid form type",
  },
  INVALID_DEADLINE_DATE_APPROVAL_FORM: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1084,
    message: "Invalid deadline date approval form",
  },
  INVALID_DESCRIPTION_DEPARTMENT: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1086,
    message: "Invalid description department",
  },
  INVALID_ROLE_PREFIX: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1087,
    message: `Role must start with "ROLE_"`,
  },
  INVALID_UNIT_SLUG: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1088,
    message: `Invalid unit slug"`,
  },
  INVALID_QUANTITY_PRODUCT_WAREHOUSE: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1089,
    message: `Invalid quantity product warehouse"`,
  },
  WAREHOUSE_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1090,
    message: `Warehouse not found`,
  },
  MISSING_QUANTITY_PRODUCT_WAREHOUSE_ADD_NEW: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1091,
    message: `Missing quantity product warehouse add new"`,
  },
  ERROR_WHEN_UPDATE_PRODUCT_QUANTITY: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1092,
    message: `Error when update product quantity"`,
  },
  INVALID_TEMPORARY_REQUEST_PRODUCT_NAME: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1093,
    message: `Invalid temporary request product name"`,
  },
  INVALID_QUANTITY_TEMPORARY_REQUEST_PRODUCT: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1094,
    message: `Invalid quantity temporary request product"`,
  },
  INVALID_TEMPORARY_REQUEST_PRODUCT_PROVIDER: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1095,
    message: `Invalid temporary request product provider"`,
  },
  INVALID_TEMPORARY_REQUEST_PRODUCT_DESCRIPTION: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1096,
    message: `Invalid temporary request product description"`,
  },
  INVALID_PRODUCT_DESCRIPTION: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1097,
    message: `Invalid product description`,
  },
  FILE_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1098,
    message: `File not found`,
  },
  INVALID_NAME_NORMALIZE_DEPARTMENT: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1099,
    message: `Name normalize department must end with "_DEPARTMENT"`,
  },
  INVALID_WAREHOUSE_SLUG: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1100,
    message: `Invalid warehouse slug"`,
  },
  INVALID_WAREHOUSE_NAME: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1101,
    message: `Invalid warehouse name"`,
  },
  INVALID_WAREHOUSE_ADDRESS: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1102,
    message: `Invalid warehouse address"`,
  },
  INVALID_NAME_DISPLAY: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1103,
    message: `Invalid display name"`,
  },
  INVALID_NAME_NORMALIZE: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1104,
    message: `Invalid normalize name"`,
  },
  INVALID_FORM_DESCRIPTION: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1105,
    message: `Invalid form description"`,
  },
  SAVE_FILE_FAIL: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1106,
    message: `Save file fail`,
  },
  ERROR_GET_FILE_FROM_REQUEST: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1108,
    message: "Error get file from request",
  },
  INVALID_RESOURCE_NAME: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1109,
    message: "Resource name invalid",
  },
  RESOURCE_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1110,
    message: "Resource not found",
  },
  RESOURCE_EXIST: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1111,
    message: "Resource is existed",
  },
  ASSIGNED_USER_APPROVAL_THIS_LEVEL_FOR_SITE_IS_EXISTED: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1112,
    message: "Assigned user approval this level for site is existed",
  },
  INVALID_PURCHASE_PRODUCT_QUANTITY: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1113,
    message: "Invalid purchase product quantity",
  },
  INVALID_PURCHASE_PRODUCT_ARRAY: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1114,
    message: "Invalid purchase product array",
  },
  INVALID_STATUS_FORM: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1115,
    message: "Invalid status form",
  },
  PRODUCT_PURCHASE_FORM_CODE_EXISTED: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1116,
    message: "Product purchase form code existed",
  },
  INVALID_NEW_PASSWORD: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1117,
    message: "New password invalid",
  },
  INVALID_CONFIRM_PASSWORD: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1118,
    message: "Confirm password invalid",
  },
  PASSWORD_NOT_MATCH: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1119,
    message: "Password does not match",
  },
  CONFIRM_PASSWORD_NOT_MATCH: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1120,
    message: "Confirm password does not match",
  },
  PURCHASE_PRODUCT_IS_NOT_INCLUDE_IN_REQUEST_PRODUCTS: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1121,
    message: "Purchase product is not include in request products",
  },
  PURCHASE_PRODUCT_QUANTITY_EXCEED_REQUEST_PRODUCT_QUANTITY: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1122,
    message: "Purchase product quantity exceed request product quantity",
  },
  USER_DEPARTMENT_EXIST: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1123,
    message: "User department exists",
  },
  INVALID_PRODUCT_REQUISITION_FORM_SLUG: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1124,
    message: "Invalid product requisition form slug",
  },
  INVALID_TEMPORARY_PRODUCT_SLUG: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1125,
    message: "Invalid temporary product slug",
  },
  PRODUCT_REQUISITION_FORM_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1126,
    message: "Product requisition form not found",
  },
  CAN_NOT_CREATE_PURCHASE_FORM_FROM_REQUISITION_FORM: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1127,
    message: "Can't create purchase form from this requisition form",
  },
  PRODUCT_EXISTED_IN_THIS_WAREHOUSE: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1128,
    message: "Product existed in this warehouse",
  },
  INVALID_USER_GENDER: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1129,
    message: "Invalid user gender",
  },
  INVALID_USER_ADDRESS: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1130,
    message: "Invalid user address",
  },
  INVALID_USER_PHONE_NUMBER: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1131,
    message: "Invalid user phone number",
  },
  INVALID_USER_EMAIL: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1132,
    message: "Invalid user email",
  },
  WORKSHEET_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1133,
    message: "Worksheet not found",
  },
  USER_DEPARTMENT_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1134,
    message: "User department not found",
  },
  INVALID_USER_DEPARTMENT_SLUG: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1135,
    message: "User department slug invalid",
  },
  USER_ROLE_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1136,
    message: "User role not found",
  },
  INVALID_DOB: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1137,
    message: "Date of birth invalid",
  },
  INVALID_GENDER: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1138,
    message: "Gender invalid",
  },
  INVALID_ADDRESS: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1139,
    message: "Address invalid",
  },
  INVALID_PHONENUMBER: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1140,
    message: "Phone number invalid",
  },
  ASSIGNED_USER_APPROVAL_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1141,
    message: "Assigned user approval not found",
  },
  NOTIFICATION_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1142,
    message: "Notification not found",
  },
  ROLE_PERMISSION_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1143,
    message: "Role permission not found",
  },
  USER_ROLE_EXIST: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1144,
    message: "User role is existed",
  },
  ROLE_PERMISSION_EXIST: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1145,
    message: "Role permission is existed",
  },
  NAME_NORMALIZE_EXIST: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 1146,
    message: "Name normalize is existed",
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

  // DB error
  // Code range: [4100 - 4299]
  DUPLICATE_ENTRY: {
    httpStatusCode: StatusCodes.CONFLICT,
    code: 4100,
    message: `Duplicate entry`,
  },
  EXPORT_DB_ERROR: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 4101,
    message: `Error when export database`,
  },

  // System error
  // Code range: [4300 - 4499]
  FOLDER_NOT_FOUND: {
    httpStatusCode: StatusCodes.BAD_REQUEST,
    code: 4300,
    message: `Folder is not existed`,
  },
} as const;
