import { AutoMap } from "@automapper/classes";
import { ProductRequisitionFormResponseDto } from "@dto/response";
import { BaseResponseDto } from "./base-response.dto";

export class ProjectResponseDto extends BaseResponseDto {
  @AutoMap()
  name?: string;

  @AutoMap()
  startDate?: string;

  @AutoMap()
  description?: string;

  @AutoMap()
  slug?: string;

  site?: string;

  siteSlug?: string;

  @AutoMap(() => [ProductRequisitionFormResponseDto])
  productRequisitionFormResponseDto?: ProductRequisitionFormResponseDto[];
}
