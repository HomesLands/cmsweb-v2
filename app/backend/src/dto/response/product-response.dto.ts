import { AutoMap } from "@automapper/classes";
import {
  ProductWarehouseResponseDto,
  UnitResponseDto
} from "@dto/response";
import { BaseResponseDto } from "./base-response.dto";

export class ProductResponseDto extends BaseResponseDto {
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
