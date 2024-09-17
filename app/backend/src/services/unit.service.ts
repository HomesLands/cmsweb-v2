import { unitRepository } from "@repositories";
import { mapper } from "@mappers";
import { plainToClass } from "class-transformer";

import { Unit } from "@entities/unit.entity";
import { UnitResponseDto } from "@dto/response";
import { CreateUnitRequestDto } from "@dto/request";  
import { TCreateUnitRequestDto } from "@types";
import { GlobalError } from "@exception/global-error";
import { ErrorCodes } from "@exception/error-code";

class UnitService {
  public async getAllUnits(): Promise<UnitResponseDto[] | []> {
    const unitData = await unitRepository.findAllUnits();
    if(unitData.length < 1) {
      return [];
    }

    const unitsDto: UnitResponseDto[] = mapper.mapArray(
      unitData,
      Unit,
      UnitResponseDto
    );
    return unitsDto;
  }

  public async createUnit(plainData: TCreateUnitRequestDto): Promise<UnitResponseDto> {
    // Map plain object to request dto
    const requestData = plainToClass(CreateUnitRequestDto, plainData);

    // Find exist
    const hasExisted = await unitRepository.existsBy({
      name: requestData.name,
    });
    if (hasExisted) throw new GlobalError(ErrorCodes.UNIT_EXIST);

    const unitData = mapper.map(requestData, CreateUnitRequestDto, Unit);
    const dataSiteCreated = await unitRepository.createAndSave(unitData);
    
    return mapper.map(dataSiteCreated, Unit, UnitResponseDto);
  }
}

export default new UnitService();