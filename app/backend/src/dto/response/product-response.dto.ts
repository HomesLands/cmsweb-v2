import { AutoMap } from "@automapper/classes";
import {
  BaseResponseDto,
  ProductWarehouseResponseDto,
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

  unit?: string;

  @AutoMap(() =>[ProductWarehouseResponseDto])
  productWarehouses?: ProductWarehouseResponseDto[];
}
