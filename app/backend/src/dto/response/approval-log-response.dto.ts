import { AutoMap } from "@automapper/classes";

export class ApprovalLogResponseDto {
  @AutoMap()
  status?: string;

  @AutoMap()
  content?: string;

  @AutoMap()
  slug?: string;

  createdAt?: string;
}