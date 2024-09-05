import { TErrorCodeValue } from "@types";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

export class GlobalException extends Error {
  private _errorCodeValue: TErrorCodeValue;

  constructor(errorCodeValue: TErrorCodeValue | StatusCodes) {
    if (typeof errorCodeValue === "object") {
      super(errorCodeValue.message);
      this._errorCodeValue = errorCodeValue;
    } else {
      super(getReasonPhrase(errorCodeValue.valueOf()));
      this._errorCodeValue = {
        code: errorCodeValue.valueOf(),
        httpStatusCode: errorCodeValue.valueOf(),
        message: getReasonPhrase(errorCodeValue.valueOf()),
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
