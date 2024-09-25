import { AutoMap } from "@automapper/classes";
import { BaseResponseDto } from "./base-response.dto";

export class SiteResponseDto extends BaseResponseDto {
  @AutoMap()
  name?: string;

  @AutoMap()
  address?: string;

  managerFullname?: string;

  managerSlug?: string;
}
