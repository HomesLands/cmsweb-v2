import { AutoMap } from "@automapper/classes";
import {
  BaseResponseDto,
  RequestProductResponseDto,
  UserApprovalResponseDto,
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

  project?: string;
  
  projectSlug?: string;

  creator?: string;

  creatorSlug?: string;

  @AutoMap(() => [RequestProductResponseDto])
  requestProducts?: RequestProductResponseDto[];

  @AutoMap(() => [UserApprovalResponseDto])
  userApprovals?: UserApprovalResponseDto[];
}
