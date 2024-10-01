import { AutoMap } from "@automapper/classes";
import { 
  BaseResponseDto,
  UnitResponseDto
} from "@dto/response";


export class TemporaryProductResponseDto
 extends BaseResponseDto 
 {
  @AutoMap()
  name?: string;
  
  @AutoMap()
  provider?: string;
  
  @AutoMap(() => UnitResponseDto)
  unit?: UnitResponseDto;
}
