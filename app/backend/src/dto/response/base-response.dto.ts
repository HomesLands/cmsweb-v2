import { AutoMap } from "@automapper/classes";

export class BaseResponseDto {
  @AutoMap()
  createdAt?: string;

  @AutoMap()
  updatedAt?: string;

  @AutoMap()
  slug?: string;
}
