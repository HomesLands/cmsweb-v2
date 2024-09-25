import { AutoMap } from "@automapper/classes";
import { BaseResponseDto } from "./base-response.dto";

export class ProjectResponseDto extends BaseResponseDto {
  @AutoMap()
  name?: string;

  @AutoMap()
  startDate?: string;

  @AutoMap()
  description?: string;

  managerFullname?: string;

  managerSlug?: string;
}
