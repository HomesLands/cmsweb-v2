import { mapper } from "@mappers";
import { TPaginationOptionResponse, TProductQueryRequest } from "@types";
import { ProductResponseDto } from "@dto/response";
import { productRepository, unitRepository } from "@repositories";
import { Product } from "@entities/product.entity";
import { TCreateProductRequestDto } from "@types";
import { CreateProductRequestDto } from "@dto/request";
import { GlobalError, ErrorCodes, ValidationError } from "@exception";

import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { FindOperator, Like } from "typeorm";

class ProductService {
  public async getAllProducts(
    options: TProductQueryRequest
  ): Promise<TPaginationOptionResponse<ProductResponseDto[]>> {
    const searchConditions: { name?: FindOperator<string> } = {};
    if (options.searchTerm) {
      searchConditions.name = Like(`%${options.searchTerm}%`);
      // You can extend this to search by other fields (e.g., description, category)
    }

    // Get the total number of products
    const totalProducts = await productRepository.count({
      where: searchConditions,
    });

    const products = await productRepository.find({
      take: options.take,
      skip: options.skip,
      order: { createdAt: options.order },
      relations: ["unit"],
      where: searchConditions,
    });

    // Map the products to the DTO
    const results = mapper.mapArray(products, Product, ProductResponseDto);

    // Calculate pagination details
    const page = Math.ceil(options.skip / options.take) + 1;
    const pageSize = +options.take;
    const totalPages = Math.ceil(totalProducts / options.take);

    return {
      items: results,
      page,
      pageSize,
      totalPages,
    };
  }

  public async createProduct(
    plainData: TCreateProductRequestDto
  ): Promise<ProductResponseDto> {
    const requestData = plainToClass(CreateProductRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    // Allow the barcode field to be null. If the barcode in the request has a value,
    // we need to check it to avoid duplicate product entries
    if (requestData.code) {
      const codeExisted = await productRepository.existsBy({
        code: requestData.code,
      });
      if (codeExisted) throw new GlobalError(ErrorCodes.CODE_PRODUCT_EXIST);
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
