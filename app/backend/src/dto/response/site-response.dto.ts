import { AutoMap } from "@automapper/classes";

export class SiteResponseDto {
  @AutoMap()
  name?: string;

  @AutoMap()
  address?: string;

  managerFullname?: string;

  mangerSlug?: string;

  @AutoMap()
  slug?: string;
}