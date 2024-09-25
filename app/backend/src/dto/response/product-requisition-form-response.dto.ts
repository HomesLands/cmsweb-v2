import { AutoMap } from "@automapper/classes";
import {
  BaseResponseDto,
  RequestProductResponseDto,
  UserApprovalResponseDto,
} from "@dto/response";

export class ProductRequisitionFormResponseDto {
  @AutoMap()
  slug?: string;

  @AutoMap()
  code?: string;

  @AutoMap()
  type?: string;

  @AutoMap()
  status?: string;

  @AutoMap()
  isRecalled?: boolean;

  @AutoMap()
  description?: boolean;

  company?: string;

  companySlug?: string;

  site?: string;

  siteSlug?: string;

  project?: string;

  projectSlug?: string;

  creator?: string;

  creatorSlug?: string;

  @AutoMap(() => [RequestProductResponseDto])
  requestProducts?: RequestProductResponseDto[];

  @AutoMap(() => [UserApprovalResponseDto])
  userApprovals?: UserApprovalResponseDto[];
}
