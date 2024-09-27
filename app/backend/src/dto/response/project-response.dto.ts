import { AutoMap } from "@automapper/classes";
import { ProductRequisitionFormResponseDto } from "@dto/response";

export class ProjectResponseDto {
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