import { ValidationError as ClassValidatorError } from "class-validator";
import _ from "lodash";

import { TErrorCodeKey, TErrorCodeValue } from "@types";
import { ErrorCodes } from "./error-code";

export class ValidationError extends Error {
  private _errorCodeValue: TErrorCodeValue;

  constructor(validationErrors: ClassValidatorError[]) {
    // Call the base class Error constructor with a generic message
    super("Validation failed");
    this.name = "ValidationError";

    // Process the first validation error
    const firstError = this.getFirstValidationError(validationErrors);
    this._errorCodeValue = this.transformErrorToErrorCode(firstError);
  }

  // Get the first validation error in the list
  private getFirstValidationError(
    errors: ClassValidatorError[]
  ): ClassValidatorError {
    for (const error of errors) {
      if (error.constraints) {
        return error;
      }
      if (error.children && error.children.length > 0) {
        return this.getFirstValidationError(error.children); // Recursively search for nested errors
      }
    }
    // If no errors found, return a default error structure
    return {
      property: "unknown",
      value: undefined,
      constraints: { unknownError: "An unknown error occurred" },
    } as ClassValidatorError;
  }

  // Transform the validation error into the TErrorCodeValue format
  private transformErrorToErrorCode(
    error: ClassValidatorError
  ): TErrorCodeValue {
    const constraintKey =
      error.constraints &&
      (Object.values(error.constraints)[0] as TErrorCodeKey);
    if (!constraintKey) return ErrorCodes.UNIDENTIFIED_ERROR;
    if (!_.has(ErrorCodes, constraintKey)) return ErrorCodes.UNIDENTIFIED_ERROR;
    return ErrorCodes[constraintKey];
  }

  public get errorCodeValue() {
    return this._errorCodeValue;
  }

  public set errorCodeValue(errorCodeValue: TErrorCodeValue) {
    this._errorCodeValue = errorCodeValue;
  }
}
