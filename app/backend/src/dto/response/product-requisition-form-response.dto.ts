import { AutoMap } from "@automapper/classes";
import {
  BaseResponseDto,
  RequestProductResponseDto,
  UserApprovalResponseDto,
  UserResponseDto,
  ProjectResponseDto
} from "@dto/response";

export class ProductRequisitionFormResponseDto 
// extends BaseResponseDto
{
  @AutoMap()
  code?: string;

  @AutoMap()
  type?: string;

  @AutoMap()
  status?: string;

  @AutoMap()
  isRecalled?: boolean;

  deadlineApproval?: string;

  @AutoMap()
  description?: boolean;

  @AutoMap(() => ProjectResponseDto)
  project?: ProjectResponseDto;
  
  @AutoMap(() => UserResponseDto)
  creator?: UserResponseDto;

  @AutoMap(() => [RequestProductResponseDto])
  requestProducts?: RequestProductResponseDto[];

  @AutoMap(() => [UserApprovalResponseDto])
  userApprovals?: UserApprovalResponseDto[];
}
