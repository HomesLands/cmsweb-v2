import { Workbook } from "exceljs";
import { mapper } from "@mappers";
import {
  TPaginationOptionResponse,
  TProductQueryRequest,
  TUpdateProductRequestDto,
  TUploadProductRequestDto,
} from "@types";
import { ProductResponseDto } from "@dto/response";
import { productRepository, unitRepository } from "@repositories";
import { Product } from "@entities/product.entity";
import { TCreateProductRequestDto } from "@types";
import { CreateProductRequestDto, UpdateProductRequestDto } from "@dto/request";
import { GlobalError, ErrorCodes, ValidationError } from "@exception";

import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { FindOperator, Like } from "typeorm";
import { parsePagination } from "@utils/pagination.util";

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
    const { page, pageSize } = parsePagination(options);

    // Calculate pagination details
    const totalPages = Math.ceil(totalProducts / pageSize);

    const products = await productRepository.find({
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { createdAt: options.order },
      relations: ["unit"],
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
    if (!unit) throw new GlobalError(ErrorCodes.UNIT_NOT_FOUND);

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
    if (!product) throw new GlobalError(ErrorCodes.PRODUCT_NOT_FOUND);

    const unit = await unitRepository.findOneBy({ slug: requestData.unit });
    if (!unit) throw new GlobalError(ErrorCodes.UNIT_NOT_FOUND);

    Object.assign(product, requestData);
    product.unit = unit;

    product = await productRepository.save(product);

    const productDto = mapper.map(product, Product, ProductResponseDto);
    return productDto;
  }

  public async uploadProduct(
    plainData: TUploadProductRequestDto
  ): Promise<number> {
    const workbook = new Workbook();
    if (!plainData.file?.buffer)
      throw new GlobalError(ErrorCodes.FILE_NOT_FOUND);

    await workbook.xlsx.load(plainData.file.buffer);

    if (workbook.worksheets.length <= 0)
      throw new GlobalError(ErrorCodes.WORKSHEET_NOT_FOUND);

    const products: TCreateProductRequestDto[] = [];
    const uniqueNames = new Set<string>();

    const worksheet = workbook.worksheets[0];
    worksheet?.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        const codeCell = row.findCell(2);
        const providerCell = row.findCell(3);
        const nameCell = row.findCell(6);
        const unitCell = row.findCell(9);
        const descriptionCell = row.findCell(12);

        if (!codeCell?.value)
          throw new GlobalError(ErrorCodes.INVALID_PRODUCT_CODE);
        if (!nameCell?.value)
          throw new GlobalError(ErrorCodes.INVALID_PRODUCT_NAME);
        if (!unitCell?.value)
          throw new GlobalError(ErrorCodes.INVALID_UNIT_NAME);
        if (!providerCell?.value)
          throw new GlobalError(ErrorCodes.INVALID_PRODUCT_PROVIDER);

        if (!uniqueNames.has(nameCell.value.toString())) {
          products.push({
            name: nameCell.value.toString(),
            code: codeCell.value.toString(),
            description: descriptionCell?.value?.toString() || "",
            unit: unitCell?.value?.toString().toLowerCase(),
            provider: providerCell.value.toString(),
          });
          uniqueNames.add(nameCell.value.toString());
        }
      }
    });

    const requestProducts: Product[] = await Promise.all(
      products.map(async (item) => {
        const existUnit = await unitRepository.findOne({
          where: {
            name: item.unit,
          },
        });
        const unit =
          existUnit ||
          (await unitRepository.createAndSave({
            name: item.unit,
          }));
        return { ...item, unit } as Product;
      })
    );

    const createdProducts =
      await productRepository.bulkCreateAndSave(requestProducts);

    return createdProducts.length;
  }

  public async deleteProduct(slug: string): Promise<number> {
    const product = await productRepository.findOneBy({
      slug,
    });
    if (!product) throw new GlobalError(ErrorCodes.PRODUCT_NOT_FOUND);

    const deleted = await productRepository.softDelete({ slug });
    return deleted.affected || 0;
  }
}

export default new ProductService();
