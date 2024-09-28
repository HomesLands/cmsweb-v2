import { AutoMap } from "@automapper/classes";
import { BaseResponseDto } from "./base-response.dto";

export class ProductResponseDto extends BaseResponseDto {
  @AutoMap()
  name?: string;

  @AutoMap()
  code?: string;

  @AutoMap()
  provider?: string;

  @AutoMap()
  description?: string;

  @AutoMap()
  quantity?: number;
}
