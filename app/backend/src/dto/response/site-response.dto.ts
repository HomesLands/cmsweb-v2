import { AutoMap } from "@automapper/classes";

export class SiteResponseDto {
  @AutoMap()
  name?: string;

  @AutoMap()
  address?: string;

  managerFullname?: string;

  managerSlug?: string;

  @AutoMap()
  slug?: string;
}