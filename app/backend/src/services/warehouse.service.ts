import { mapper } from "@mappers";
import { plainToClass } from "class-transformer";

import { warehouseRepository } from "@repositories";
import { Warehouse } from "@entities";
import { WarehouseResponseDto } from "@dto/response";
import { CreateWarehouseRequestDto } from "@dto/request";
import { TCreateWarehouseRequestDto } from "@types";
import { ValidationError } from "@exception";
import { validate } from "class-validator";

class WarehouseService {
  public async getAllWarehouses(): Promise<WarehouseResponseDto[] | []> {
    const warehousesData = await warehouseRepository.find({
      relations: [
        'productWarehouses',
      ]
    });

    const warehousesDto: WarehouseResponseDto[] = mapper.mapArray(
      warehousesData,
      Warehouse,
      WarehouseResponseDto
    );
    return warehousesDto;
  }

  public async createWarehouse(plainData: TCreateWarehouseRequestDto): Promise<WarehouseResponseDto> {
    // Map plain object to request dto
    const requestData = plainToClass(CreateWarehouseRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const warehouseData = mapper.map(requestData, CreateWarehouseRequestDto, Warehouse);

    const dataWarehouseCreated = await warehouseRepository.createAndSave(warehouseData);
    
    return mapper.map(dataWarehouseCreated, Warehouse, WarehouseResponseDto);
  }
}

export default new WarehouseService();