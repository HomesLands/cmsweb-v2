import { TErrorCodeValue } from "@types";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import _ from "lodash";

export class GlobalError extends Error {
  private _errorCodeValue: TErrorCodeValue;

  constructor(errorCodeValue: TErrorCodeValue | StatusCodes) {
    if (typeof errorCodeValue === "object" && _.has(errorCodeValue, "code")) {
      // Handle TErrorCodeValue (custom error code object)
      super(
        errorCodeValue.message || getReasonPhrase(errorCodeValue.httpStatusCode)
      );
      this._errorCodeValue = {
        code: errorCodeValue.code,
        httpStatusCode:
          errorCodeValue.httpStatusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message:
          errorCodeValue.message ||
          getReasonPhrase(errorCodeValue.httpStatusCode),
      };
    } else if (typeof errorCodeValue === "number") {
      // Handle StatusCodes (standard HTTP status codes)
      const statusCode = errorCodeValue as StatusCodes;
      const message = getReasonPhrase(statusCode);
      super(message);
      this._errorCodeValue = {
        code: statusCode,
        httpStatusCode: statusCode,
        message,
      };
    } else {
      // Fallback for unexpected error code types
      const fallbackMessage = "Unknown error occurred";
      super(fallbackMessage);
      this._errorCodeValue = {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        httpStatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: fallbackMessage,
      };
    }
  }

  public get errorCodeValue() {
    return this._errorCodeValue;
  }

  public set errorCodeValue(errorCodeValue: TErrorCodeValue) {
    this._errorCodeValue = errorCodeValue;
  }
}
