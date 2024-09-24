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
  | "UNIT_EXIST"
  | "UNIT_NOT_FOUND"
  | "CODE_PRODUCT_EXIST"
  | "INVALID_PRODUCT_PROVIDER"
  | "INVALID_PRODUCT_NAME"
  | "INVALID_PRODUCT_UNIT"
  | "INVALID_PRODUCT_CODE"
  | "INVALID_SITE_NAME"
  | "INVALID_SITE_ADDRESS"
  | "INVALID_SITE_MANAGER"
  | "INVALID_PROJECT_NAME"
  | "INVALID_PROJECT_START_DATE"
  | "INVALID_PROJECT_PROCESS"
  | "INVALID_PROJECT_DESCRIPTION"
  | "INVALID_PROJECT_FILE_DESCRIPTION"
  | "INVALID_PROJECT_MANAGER"
  | "INVALID_UNIT_NAME"
  | "INVALID_DATE_FORMAT"
  | "INVALID_COMPANY_NAME"
  | "COMPANY_NAME_EXIST"
  | "PRODUCT_REQUISITION_FORM_CODE_EXIST"
  | "COMPANY_NOT_FOUND"
  | "INVALID_QUANTITY_USER_APPROVAL"
  | "PRODUCT_NOT_FOUND"
  | "FORM_NOT_FOUND"
  | "MISSING_USER_APPROVAL"
  | "ROLE_NOT_FOUND"
  | "AUTHORITY_NOT_FOUND"
  | "PERMISSION_NOT_FOUND"
  | "USER_ROLE_EXIST"
  | "PERMISSION_EXIST"
  | "APPROVAL_USER_NOT_FOUND"
  | "USER_OF_APPROVAL_USER_NOT_FOUND"
  | "INVALID_APPROVAL_USER_FOR_APPROVAL_FORM"
  | "PRODUCT_REQUISITION_FORM_DONE_APPROVAL"
  | "SITE_NOT_FOUND"
  | "PROJECT_NOT_FOUND"
  | "INVALID_CREATOR"
  | "INVALID_APPROVAL_STATUS"
  | "INVALID_CONTENT_APPROVAL_LOG"
  | "INVALID_CODE_FORM"
  | "INVALID_TYPE_PRODUCT_REQUISITION_FORM"
  | "INVALID_COMPANY_SLUG"
  | "INVALID_SITE_SLUG"
  | "INVALID_PROJECT_SLUG"
  | "INVALID_REQUEST_PRODUCT_ARRAY"
  | "INVALID_APPROVAL_USER_ARRAY"
  | "INVALID_FORM_SLUG"
  | "INVALID_APPROVAL_USER_SLUG"
  | "INVALID_PRODUCT_SLUG"
  | "INVALID_USER_SLUG_IN_USER_APPROVAL"
  | "INVALID_REQUEST_PRODUCT_QUANTITY"
  | "INVALID_ROLE_APPROVAL"
  | "INVALID_COMPANY_DIRECTOR"
  | "COMPANY_DIRECTOR_NOT_FOUND"
  | "FORM_NOT_CREATED_BY_YOU"
  | "INVALID_REQUEST_PRODUCT_SLUG"
  | "REQUEST_PRODUCT_NOT_FOUND"
  | "CAN_NOT_EDIT_FORM"
  | "REQUEST_PRODUCT_EXIST"
  | "INVALID_REASON_RESUBMIT_FORM"
  | "EXP_NOT_EXIST";

export type TErrorCodeValue = {
  code: number;
  message: string;
  httpStatusCode: number;
};

export type TErrorCode = Record<TErrorCodeKey, TErrorCodeValue>;
