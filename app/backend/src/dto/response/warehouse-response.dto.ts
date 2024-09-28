import { AutoMap } from "@automapper/classes";
import { 
  BaseResponseDto, 
  ProductWarehouseResponseDto 
} from "@dto/response";


export class WarehouseResponseDto
 extends BaseResponseDto 
 {
  @AutoMap()
  name?: string;

  @AutoMap()
  address?: string;

  @AutoMap()
  description?: string;

  @AutoMap(() => [ProductWarehouseResponseDto])
  productWarehouses?: ProductWarehouseResponseDto[];
}
