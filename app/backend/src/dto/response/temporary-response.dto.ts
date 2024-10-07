import { AutoMap } from "@automapper/classes";
import { 
  UnitResponseDto
} from "@dto/response";
import { BaseResponseDto } from "./base-response.dto";


export class TemporaryProductResponseDto extends BaseResponseDto {
  @AutoMap()
  name?: string;
  
  @AutoMap()
  provider?: string;

  @AutoMap()
  description?: string;
  
  @AutoMap(() => UnitResponseDto)
  unit?: UnitResponseDto;
}
