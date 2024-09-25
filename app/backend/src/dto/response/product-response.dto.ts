import { AutoMap } from "@automapper/classes";

export class ProductResponseDto {
  @AutoMap()
  name?: string

  @AutoMap()
  code?: string;

  @AutoMap()
  provider?: string;

  @AutoMap()
  description?: string;

  @AutoMap()
  quantity?: number;

  @AutoMap()
  rfid?: number;

  unit?: string;
}