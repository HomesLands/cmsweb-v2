import { AutoMap } from "@automapper/classes";

export class ProductResponseDto {
  @AutoMap()
  name?: string

  @AutoMap()
  code?: string;

  @AutoMap()
  provider?: string;

  @AutoMap()
  status?: string;

  @AutoMap()
  description?: string;

  unit?: string;
}