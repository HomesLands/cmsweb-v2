import { AutoMap } from "@automapper/classes";

export class SiteResponseDto {
  @AutoMap()
  name?: string;

  @AutoMap()
  address?: string;

  managerFullname?: string;

  mangerId?: string;

  @AutoMap()
  id?: string;
}