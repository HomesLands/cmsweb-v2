import { AutoMap } from "@automapper/classes";
import { BaseResponseDto } from "./base-response.dto";

export class RoleResponseDto extends BaseResponseDto {
  @AutoMap()
  nameNormalize?: string;

  @AutoMap()
  description?: string;
}
