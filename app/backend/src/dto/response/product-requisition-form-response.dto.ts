import { AutoMap } from "@automapper/classes";
import {
  RequestProductResponseDto,
  UserApprovalResponseDto,
  UserResponseDto,
  ProjectResponseDto
} from "@dto/response";
import { BaseResponseDto } from "./base-response.dto";

export class ProductRequisitionFormResponseDto extends BaseResponseDto {
  @AutoMap()
  code?: string;

  @AutoMap()
  type?: string;

  @AutoMap()
  status?: string;

  @AutoMap()
  isRecalled?: boolean;

  @AutoMap()
  deadlineApproval?: string;

  @AutoMap()
  description?: boolean;

  // @AutoMap(() => ProjectResponseDto)
  // project?: ProjectResponseDto;

  @AutoMap()
  projectName?: string;
  
  @AutoMap(() => UserResponseDto)
  creator?: UserResponseDto;

  @AutoMap(() => [RequestProductResponseDto])
  requestProducts?: RequestProductResponseDto[];

  @AutoMap(() => [UserApprovalResponseDto])
  userApprovals?: UserApprovalResponseDto[];
}
