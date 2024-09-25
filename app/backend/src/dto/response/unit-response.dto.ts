import { AutoMap } from "@automapper/classes";
import { BaseResponseDto } from "./base-response.dto";

export class UnitResponseDto extends BaseResponseDto {
  @AutoMap()
  name?: string;
}
