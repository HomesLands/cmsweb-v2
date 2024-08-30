import { IStatusResponse } from "@types";

export class GlobalException extends Error {
  public statusCode;

  constructor(result: IStatusResponse) {
    super();
    this.statusCode = result.code;
    this.message = result.message;
  }
}