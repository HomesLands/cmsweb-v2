import { AutoMap } from "@automapper/classes";

export class UnitResponseDto {
  @AutoMap()
  name?: string;

  @AutoMap()
  slug?: string;
}