import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

// Custom constraint class
@ValidatorConstraint({ async: false })
export class DepartmentPostfixConstraint implements ValidatorConstraintInterface {
  validate(role: string) {
    return typeof role === "string" && role.endsWith("_DEPARTMENT"); // checks if role end with '_DEPARTMENT'
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must end with "_DEPARTMENT"`;
  }
}

// Custom decorator
export function DepartmentPostfix(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "DepartmentPostfix",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: DepartmentPostfixConstraint,
    });
  };
}
