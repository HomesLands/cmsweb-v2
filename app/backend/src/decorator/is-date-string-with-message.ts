import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

export function IsDateStringWithMessage(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "isCustomDateString",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return typeof value === "string" && !isNaN(Date.parse(value));
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid ISO 8601 date string!`;
        },
      },
    });
  };
}
