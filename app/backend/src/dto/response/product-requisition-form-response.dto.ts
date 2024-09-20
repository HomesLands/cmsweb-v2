import { AutoMap } from "@automapper/classes";
import {
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

  company?: string;

  companySlug?: string;

  @AutoMap(() => [RequestProductResponseDto])
  requestProducts?: RequestProductResponseDto[];

  @AutoMap(() => [UserApprovalResponseDto])
  userApprovals?: UserApprovalResponseDto[];
}