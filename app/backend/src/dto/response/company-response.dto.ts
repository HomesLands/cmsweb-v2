import { AutoMap } from "@automapper/classes";

export class CompanyResponseDto {
  @AutoMap()
  name?: string;

  @AutoMap()
  slug?: string;
}