import { mapper } from "@mappers";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import { productRepository, productWarehouseRepository, warehouseRepository } from "@repositories";
import { ProductWarehouse } from "@entities";
import { ProductWarehouseResponseDto } from "@dto/response";
import { CreateProductWarehouseRequestDto } from "@dto/request";
import { TCreateProductWarehouseRequestDto } from "@types";
import { GlobalError, ErrorCodes, ValidationError } from "@exception";
import { ProductUtils } from "@utils";


class ProductWarehouseService {
  public async getProductWarehouses(): Promise<ProductWarehouseResponseDto[] | []> {
    const productWarehousesData = await productWarehouseRepository.find({
      relations: [
        'warehouse',
        'product',
        'product.unit',
      ]
    });

    const productWarehousesDto: ProductWarehouseResponseDto[] = mapper.mapArray(
      productWarehousesData,
      ProductWarehouse,
      ProductWarehouseResponseDto
    );
    return productWarehousesDto;
  }

  public async createProductWarehouse(
    plainData: TCreateProductWarehouseRequestDto
  ): Promise<ProductWarehouseResponseDto> {
    // Map plain object to request dto
    const requestData = plainToClass(CreateProductWarehouseRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const warehouse = await warehouseRepository.findOneBy({ slug: requestData.warehouse });
    if(!warehouse) throw new GlobalError(ErrorCodes.WAREHOUSE_NOT_FOUND);

    const product = await productRepository.findOneBy({ slug: requestData.product });
    if(!product) throw new GlobalError(ErrorCodes.PRODUCT_NOT_FOUND);

    const warehouseCheck = await warehouseRepository.findOne({
      where: {
        slug: requestData.warehouse,
        productWarehouses: {
          product: {
            slug: requestData.product
          }
        }
      }
    });
    if(warehouseCheck) throw new GlobalError(ErrorCodes.PRODUCT_EXISTED_IN_THIS_WAREHOUSE);

    const productWarehouseData = mapper.map(requestData, CreateProductWarehouseRequestDto, ProductWarehouse);
    productWarehouseData.warehouse = warehouse;
    productWarehouseData.product = product;

    const dataProductWarehouseCreated = await productWarehouseRepository.createAndSave(productWarehouseData);
    console.log({dataProductWarehouseCreated})

    await ProductUtils.updateQuantityProductWhenProductWarehouseChange(
      dataProductWarehouseCreated.quantity,
      dataProductWarehouseCreated.product
    );
    
    return mapper.map(dataProductWarehouseCreated, ProductWarehouse, ProductWarehouseResponseDto);
  }
}

export default new ProductWarehouseService();