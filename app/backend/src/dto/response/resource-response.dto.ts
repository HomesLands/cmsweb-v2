import { AutoMap } from "@automapper/classes";
import { BaseResponseDto } from "./base-response.dto";

export class ResourceResponseDto extends BaseResponseDto {
  @AutoMap()
  name?: string;
}
