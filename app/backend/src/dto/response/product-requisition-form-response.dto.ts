import { AutoMap } from "@automapper/classes";
import {
  RequestProductResponseDto,
  UserApprovalResponseDto,
} from "@dto/response";
import { BaseResponseDto } from "./base-response.dto";

export class ProductRequisitionFormResponseDto extends BaseResponseDto{
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
