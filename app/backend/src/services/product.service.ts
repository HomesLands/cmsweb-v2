import { mapper } from "@mappers";
import { TPaginationOptionRequest } from "@types";
import { ProductResponseDto } from "@dto/response";
import { productRepository, unitRepository } from "@repositories";
import { Product } from "@entities/product.entity";
import { TCreateProductRequestDto } from "@types";
import { CreateProductRequestDto } from "@dto/request";
import { GlobalError, ErrorCodes, ValidationError } from "@exception";

import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

class ProductService {
  public async getAllProducts(
    options: TPaginationOptionRequest
  ): Promise<ProductResponseDto[]> {
    const products = await productRepository.find({
      take: options.take,
      skip: options.skip,
      order: { createdAt: options.order },
      relations: ["unit"],
    });
    const results = mapper.mapArray(products, Product, ProductResponseDto);
    return results;
  }

  public async createProduct(
    plainData: TCreateProductRequestDto
  ): Promise<ProductResponseDto> {
    const requestData = plainToClass(CreateProductRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const codeExisted = await productRepository.existsBy({
      code: requestData.code,
    });
    if (codeExisted) {
      // code of product may null, but not duplicate
      if (requestData.code) {
        throw new GlobalError(ErrorCodes.CODE_PRODUCT_EXIST);
      }
    }

    const unit = await unitRepository.findOneBy({ slug: requestData.unit });
    if (!unit) {
      throw new GlobalError(ErrorCodes.UNIT_NOT_FOUND);
    }
    const productData = mapper.map(
      requestData,
      CreateProductRequestDto,
      Product
    );
    productData.unit = unit;

    const productDataCreated =
      await productRepository.createAndSave(productData);
    return mapper.map(productDataCreated, Product, ProductResponseDto);
  }
}

export default new ProductService();
