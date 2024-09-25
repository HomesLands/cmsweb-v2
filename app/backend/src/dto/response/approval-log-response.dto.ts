import { AutoMap } from "@automapper/classes";
import { BaseResponseDto } from "./base-response.dto";

export class ApprovalLogResponseDto extends BaseResponseDto {
  @AutoMap()
  status?: string;

  @AutoMap()
  content?: string;
}
