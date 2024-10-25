import { AutoMap } from "@automapper/classes";
import { BaseResponseDto } from "./base-response.dto";

export class NotificationResponseDto extends BaseResponseDto {
  @AutoMap()
  url?: string;

  @AutoMap()
  message?: string;

  @AutoMap()
  type?: string;

  @AutoMap()
  isRead?: string;

  @AutoMap()
  description?: string;
}
