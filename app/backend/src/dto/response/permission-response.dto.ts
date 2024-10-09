import { AutoMap } from "@automapper/classes";

export class PermissionResponseDto {
  @AutoMap()
  role: string;

  @AutoMap()
  authority: string;

  @AutoMap()
  requiredOwner?: boolean;

  @AutoMap()
  resource: string;
}
