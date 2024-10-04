import { AutoMap } from "@automapper/classes";
import { BaseResponseDto } from "./base-response.dto";
import { 
  WarehouseResponseDto, 
  ProductResponseDto
} from "@dto/response"

export class ProductWarehouseResponseDto extends BaseResponseDto {
  @AutoMap()
  quantity?: number;

  @AutoMap(() => WarehouseResponseDto)
  warehouse?: WarehouseResponseDto;

  @AutoMap(() => ProductResponseDto)
  product?: ProductResponseDto;
}
