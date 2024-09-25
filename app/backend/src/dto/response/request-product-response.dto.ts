import { AutoMap } from "@automapper/classes";
import { ProductResponseDto } from "@dto/response";

export class RequestProductResponseDto {
  @AutoMap()
  requestQuantity?: number;

  @AutoMap()
  description?: string;

  @AutoMap()
  slug?: string;

  @AutoMap(() => ProductResponseDto)
  product?: ProductResponseDto;
}
