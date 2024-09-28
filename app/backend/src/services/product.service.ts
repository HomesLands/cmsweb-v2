import { mapper } from "@mappers";
import { TPaginationOptionResponse, TProductQueryRequest, TUpdateProductRequestDto } from "@types";
import { ProductResponseDto } from "@dto/response";
import { productRepository, unitRepository } from "@repositories";
import { Product } from "@entities/product.entity";
import { TCreateProductRequestDto } from "@types";
import { CreateProductRequestDto, UpdateProductRequestDto } from "@dto/request";
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

    // Parse and validate pagination parameters
    let pageSize =
      typeof options.pageSize === "string"
        ? parseInt(options.pageSize, 10)
        : options.pageSize;
    let page =
      typeof options.page === "string"
        ? parseInt(options.page, 10)
        : options.page;

    // Ensure page and pageSize are positive numbers
    if (isNaN(page) || page <= 0) page = 1;
    if (isNaN(pageSize) || pageSize <= 0) pageSize = 10; // Default pageSize if invalid
    // Calculate pagination details
    const totalPages = Math.ceil(totalProducts / pageSize);

    const products = await productRepository.find({
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { createdAt: options.order },
      relations: [
        "unit",
      ],
      where: searchConditions,
    });

    // Map the products to the DTO
    const results = mapper.mapArray(products, Product, ProductResponseDto);

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
    if(!unit) throw new GlobalError(ErrorCodes.UNIT_NOT_FOUND);

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

  public async updateProduct(
    plainData: TUpdateProductRequestDto
  ): Promise<ProductResponseDto> {
    const requestData = plainToClass(UpdateProductRequestDto, plainData);

    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    let product = await productRepository.findOneBy({ slug: requestData.slug });
    if(!product) throw new GlobalError(ErrorCodes.PRODUCT_NOT_FOUND);

    const unit = await unitRepository.findOneBy({ slug: requestData.unit });
    if(!unit) throw new GlobalError(ErrorCodes.UNIT_NOT_FOUND);
    
    Object.assign(product, requestData);
    product.unit = unit;

    product = await productRepository.save(product);

    const productDto = mapper.map(product, Product, ProductResponseDto);
    return productDto;
  }
}

export default new ProductService();
