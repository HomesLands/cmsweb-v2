import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateProjectRequestDto {
  @IsNotEmpty({message: "INVALID_PROJECT_NAME"})
  @Expose()
  @AutoMap()
  name?: string;

  @IsNotEmpty({message: "INVALID_PROJECT_START_DATE"})
  @Expose()
  startDate?: string;

  @IsNotEmpty({message: "INVALID_PROJECT_PROCESS"})
  @Expose()
  @AutoMap()
  process?: number;

  @IsNotEmpty({message: "INVALID_PROJECT_DESCRIPTION"})
  @Expose()
  @AutoMap()
  description?: string;

  @IsNotEmpty({message: "INVALID_PROJECT_FILE_DESCRIPTION"})
  @Expose()
  @AutoMap()
  fileDescription?: string;

  @IsNotEmpty({message: "INVALID_PROJECT_MANAGER_ID"})
  @Expose()
  manager?: string;
}