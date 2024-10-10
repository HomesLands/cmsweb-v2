import { AutoMap } from "@automapper/classes";
import { BaseResponseDto } from "./base-response.dto";

export class PermissionResponseDto extends BaseResponseDto {
  @AutoMap()
  role: string;

  @AutoMap()
  authority: string;

  @AutoMap()
  requiredOwner?: boolean;

  @AutoMap()
  resource: string;
}
