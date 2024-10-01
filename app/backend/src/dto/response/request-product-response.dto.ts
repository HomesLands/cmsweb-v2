import { AutoMap } from "@automapper/classes";
import { 
  ProductResponseDto,
   BaseResponseDto,
   TemporaryProductResponseDto, 
  } from "@dto/response";

export class RequestProductResponseDto
// extends BaseResponseDto
{
  @AutoMap()
  requestQuantity?: number;

  @AutoMap()
  description?: string;

  @AutoMap()
  slug?: string;

  @AutoMap()
  isExistProduct?: boolean;

  @AutoMap(() => ProductResponseDto)
  product?: ProductResponseDto;

  @AutoMap(() => TemporaryProductResponseDto)
  temporaryProduct?: TemporaryProductResponseDto;
}
