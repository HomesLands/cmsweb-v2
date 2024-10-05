import { AutoMap } from "@automapper/classes";
import { 
  ProductWarehouseResponseDto 
} from "@dto/response";
import { BaseResponseDto } from "./base-response.dto";


export class WarehouseResponseDto extends BaseResponseDto {
  @AutoMap()
  name?: string;

  @AutoMap()
  address?: string;

  @AutoMap()
  description?: string;

  @AutoMap(() => [ProductWarehouseResponseDto])
  productWarehouses?: ProductWarehouseResponseDto[];
}
