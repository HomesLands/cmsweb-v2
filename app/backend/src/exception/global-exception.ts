import { StatusCode, StatusMessage } from '@exception/error-code';

export class GlobalException extends Error {
  public statusCode: StatusCode;

  constructor(statusCode: StatusCode) {
    super();
    this.statusCode = statusCode;
    this.message = StatusMessage[statusCode];
  }
}
