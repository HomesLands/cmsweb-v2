import { AutoMap } from "@automapper/classes";
import { ProductResponseDto, TemporaryProductResponseDto } from "@dto/response";
import { BaseResponseDto } from "./base-response.dto";

export class RequestProductResponseDto extends BaseResponseDto {
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

export class ExportRequestProductResponseDto {
  @AutoMap()
  requestQuantity?: number;

  @AutoMap()
  name?: string;

  @AutoMap()
  provider?: string;

  @AutoMap()
  unit?: string; // slug

  @AutoMap()
  description?: string;
}
