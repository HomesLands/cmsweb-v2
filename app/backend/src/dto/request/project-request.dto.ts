import { AutoMap } from "@automapper/classes";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsDateString } from "class-validator";

export class CreateProjectRequestDto {
  @IsNotEmpty({message: "INVALID_PROJECT_NAME"})
  @Expose()
  @AutoMap()
  name?: string;

  @IsNotEmpty({message: "INVALID_PROJECT_START_DATE"})
  // @IsDate({ message: "INVALID_DATE_FORMAT"})
  @IsDateString()
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

  @IsNotEmpty({message: "INVALID_PROJECT_MANAGER"})
  @Expose()
  manager?: string;
}