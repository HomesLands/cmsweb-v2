export class ApiResponseDto<T> {
  error: boolean;
  code: number;
  result: T;
  message: string;
  method: string;
  path: string;

  constructor(error: boolean, code: number, message: string,  method: string, path: string, result: T) {
    this.result = result;
    this.message = message;
    this.code = code;
    this.error = error;
    this.method = method;
    this.path = path;
  }
}
