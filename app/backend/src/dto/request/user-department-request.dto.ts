import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateUserDepartmentRequestDto {
  @IsNotEmpty({ message: "INVALID_DEPARTMENT_SLUG" })
  @Expose()
  department?: string;

  @IsNotEmpty({ message: "INVALID_USER_SLUG" })
  @Expose()
  user?: string;
}

export class UpdateUserDepartmentRequestDto {
  @IsNotEmpty({ message: "INVALID_DEPARTMENT_SLUG" })
  @Expose()
  department?: string;

  @IsNotEmpty({ message: "INVALID_USER_DEPARTMENT_SLUG" })
  @Expose()
  slug?: string;
}
