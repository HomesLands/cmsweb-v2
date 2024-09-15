import { AutoMap } from "@automapper/classes";

export class ProjectResponseDto {
  @AutoMap()
  name?: string;

  @AutoMap()
  startDate?: Date;

  @AutoMap()
  description?: string;

  managerFullname?: string;

  managerId?: string;

  @AutoMap()
  id?: string;
}