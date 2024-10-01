import { AutoMap } from "@automapper/classes";
import {
  BaseResponseDto,
  ProductWarehouseResponseDto,
  UnitResponseDto
} from "@dto/response";

export class ProductResponseDto 
// extends BaseResponseDto 
{
  @AutoMap()
  name?: string;

  @AutoMap()
  code?: string;

  @AutoMap()
  provider?: string;

  @AutoMap()
  description?: string;

  @AutoMap()
  quantity?: number;

  @AutoMap(() => UnitResponseDto)
  unit?: UnitResponseDto;

  @AutoMap(() =>[ProductWarehouseResponseDto])
  productWarehouses?: ProductWarehouseResponseDto[];
}
