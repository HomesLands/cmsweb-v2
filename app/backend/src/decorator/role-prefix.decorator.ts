import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

// Custom constraint class
@ValidatorConstraint({ async: false })
export class RolePrefixConstraint implements ValidatorConstraintInterface {
  validate(role: string) {
    return typeof role === "string" && role.startsWith("ROLE_"); // checks if role starts with 'ROLE_'
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must start with "ROLE_"`;
  }
}

// Custom decorator
export function RolePrefix(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "RolePrefix",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: RolePrefixConstraint,
    });
  };
}
