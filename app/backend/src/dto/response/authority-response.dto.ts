import { AutoMap } from "@automapper/classes";
import { BaseResponseDto } from "./base-response.dto";

export class AuthorityResponseDto extends BaseResponseDto {
  @AutoMap()
  nameNormalize?: string;

  @AutoMap()
  description?: string;

  @AutoMap()
  nameDisplay?: string;
}
