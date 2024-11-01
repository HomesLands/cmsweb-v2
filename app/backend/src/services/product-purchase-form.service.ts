import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

import { 
  TCreateProductPurchaseFormFromProductRequisitionFormRequestDto,
  TCreateProductPurchaseFormWithoutProductRequisitionFormRequestDto,
  TPaginationOptionResponse, 
  TQueryRequest
} from "@types";
import { 
  CreateProductPurchaseFormFromProductRequisitionFormRequestDto, 
  CreateProductPurchaseFormWithoutProductRequisitionFormRequestDto,
  CreatePurchaseProductWithoutRequisitionFormRequestDto,
  CreatePurchaseProductFromRequisitionFormRequestDto,
  CreateTemporaryProductRequestDto,
} from "@dto/request";
import { ProductPurchaseFormResponseDto } from "@dto/response";
import { 
  ProductPurchaseForm,
  PurchaseProduct,
  TemporaryProduct,
  ProductRequisitionForm,
} from "@entities";
import { ErrorCodes, GlobalError, ValidationError } from "@exception";
import { 
  productPurchaseFormRepository, 
  productRepository, 
  productRequisitionFormRepository, 
  temporaryProductRepository, 
  unitRepository 
} from "@repositories";
import { ProductPurchaseFormStatus, ProductRequisitionFormStatus } from "@enums";
import { mapper } from "@mappers/index";

class ProductPurchaseFormService {
  // create new, without product requisition form
  public async createProductPurchaseFormWithoutProductRequisitionForm(
    plainData: TCreateProductPurchaseFormWithoutProductRequisitionFormRequestDto
  ): Promise<ProductPurchaseFormResponseDto> {
    //CHECKING
    const requestData = 
      plainToClass(CreateProductPurchaseFormWithoutProductRequisitionFormRequestDto, plainData);
    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);
    const codeExisted = await productPurchaseFormRepository.existsBy({
      code: requestData.code,
    });
    if(codeExisted)
      throw new GlobalError(ErrorCodes.PRODUCT_PURCHASE_FORM_CODE_EXISTED);

    const purchaseProducts = [];
    for (let i = 0; i < requestData.purchaseProducts.length; i++) {
      if(requestData.purchaseProducts[i].product) {
        // product is existed
        const product = await productRepository.findOneBy({
          slug: requestData.purchaseProducts[i].product
        });
        if(product) {
          const purchaseProductMapper = mapper.map(
            requestData.purchaseProducts[i],
            CreatePurchaseProductWithoutRequisitionFormRequestDto,
            PurchaseProduct
          );
          Object.assign(purchaseProductMapper, {
            product,
            // isExistProduct: true is default
          });
          purchaseProducts.push(purchaseProductMapper);
          continue;
        }
      } 
      if(requestData.purchaseProducts[i].temporaryProduct) {
        // temporary product is existed
        const temporaryProduct = await temporaryProductRepository.findOneBy({
          slug: requestData.purchaseProducts[i].temporaryProduct
        });
        if(temporaryProduct) {
          const purchaseProductMapper = mapper.map(
            requestData.purchaseProducts[i],
            CreatePurchaseProductWithoutRequisitionFormRequestDto,
            PurchaseProduct
          );
          Object.assign(purchaseProductMapper, {
            temporaryProduct,
            isExistProduct: false,
          });
          purchaseProducts.push(purchaseProductMapper);
          continue;
        }
      } 

      // product or temporary product is not exist => create temporary product
      const unit = await unitRepository.findOneBy({ slug: requestData.purchaseProducts[i].unit});
      if(!unit) throw new GlobalError(ErrorCodes.UNIT_NOT_FOUND);

      const temporaryProductMapper = mapper.map(
        requestData.purchaseProducts[i],
        CreateTemporaryProductRequestDto,
        TemporaryProduct
      );
      Object.assign(temporaryProductMapper, {
        unit
      });

      const purchaseProductMapper = mapper.map(
        requestData.purchaseProducts[i],
        CreatePurchaseProductWithoutRequisitionFormRequestDto,
        PurchaseProduct
      );
      Object.assign(purchaseProductMapper, {
        isExistProduct: false,
        temporaryProduct: temporaryProductMapper
      });
      purchaseProducts.push(purchaseProductMapper);
    }

    //CREATE
    const formMapper = mapper.map(
      requestData,
      CreateProductPurchaseFormWithoutProductRequisitionFormRequestDto,
      ProductPurchaseForm
    );
    Object.assign(formMapper, {
      status: ProductPurchaseFormStatus.WAITING,
      purchaseProducts: purchaseProducts
    });
    const form = await productPurchaseFormRepository.createAndSave(formMapper);

    const formDto = mapper.map(
      form, 
      ProductPurchaseForm, 
      ProductPurchaseFormResponseDto
    );
    return formDto;
  }

  public async createProductPurchaseFormWithoutProductRequisitionFormTest(
    plainData: TCreateProductPurchaseFormWithoutProductRequisitionFormRequestDto
  ): Promise<ProductPurchaseFormResponseDto> {
    const requestData = await this.validateAndMapRequestData(plainData);
    await this.checkForExistingCode(requestData.code);
    
    const purchaseProducts = await this.processPurchaseProducts(requestData.purchaseProducts);
    
    return this.createProductPurchaseForm(requestData, purchaseProducts);
  }
  
  // 1. Hàm kiểm tra dữ liệu đầu vào và mapping
  private async validateAndMapRequestData(
    plainData: TCreateProductPurchaseFormWithoutProductRequisitionFormRequestDto
  ): Promise<CreateProductPurchaseFormWithoutProductRequisitionFormRequestDto> {
    const requestData = plainToClass(
      CreateProductPurchaseFormWithoutProductRequisitionFormRequestDto,
      plainData
    );
    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);
    return requestData;
  }
  
  // 2. Hàm kiểm tra mã `code` tồn tại
  private async checkForExistingCode(code: string): Promise<void> {
    const codeExisted = await productPurchaseFormRepository.existsBy({ code });
    if (codeExisted) throw new GlobalError(ErrorCodes.PRODUCT_PURCHASE_FORM_CODE_EXISTED);
  }
  
  // 3. Hàm xử lý các sản phẩm (product hoặc temporary product)
  private async processPurchaseProducts(
    purchaseProducts: Array<CreatePurchaseProductWithoutRequisitionFormRequestDto>
  ): Promise<PurchaseProduct[]> {
    const results: PurchaseProduct[] = [];
  
    for (const purchaseProduct of purchaseProducts) {
      if (purchaseProduct.product) {
        const existingProduct = await this.findAndMapProduct(purchaseProduct);
        if (existingProduct) {
          results.push(existingProduct);
          continue;
        }
      }
  
      if (purchaseProduct.temporaryProduct) {
        const existingTempProduct = await this.findAndMapTemporaryProduct(purchaseProduct);
        if (existingTempProduct) {
          results.push(existingTempProduct);
          continue;
        }
      }
  
      const newTempProduct = await this.createTemporaryProduct(purchaseProduct);
      results.push(newTempProduct);
    }
  
    return results;
  }
  
  // 4. Hàm tìm và map `product`
  private async findAndMapProduct(
    purchaseProductDto: CreatePurchaseProductWithoutRequisitionFormRequestDto
  ): Promise<PurchaseProduct | null> {
    const product = await productRepository.findOneBy({ slug: purchaseProductDto.product });
    if (!product) return null;
  
    const purchaseProductMapper = mapper.map(
      purchaseProductDto,
      CreatePurchaseProductWithoutRequisitionFormRequestDto,
      PurchaseProduct
    );
    Object.assign(purchaseProductMapper, { product });
    return purchaseProductMapper;
  }
  
  // 5. Hàm tìm và map `temporaryProduct`
  private async findAndMapTemporaryProduct(
    purchaseProductDto: CreatePurchaseProductWithoutRequisitionFormRequestDto
  ): Promise<PurchaseProduct | null> {
    const temporaryProduct = await temporaryProductRepository.findOneBy({
      slug: purchaseProductDto.temporaryProduct,
    });
    if (!temporaryProduct) return null;
  
    const purchaseProductMapper = mapper.map(
      purchaseProductDto,
      CreatePurchaseProductWithoutRequisitionFormRequestDto,
      PurchaseProduct
    );
    Object.assign(purchaseProductMapper, { temporaryProduct, isExistProduct: false });
    return purchaseProductMapper;
  }
  
  // 6. Hàm tạo `temporaryProduct` mới
  private async createTemporaryProduct(
    purchaseProductDto: CreatePurchaseProductWithoutRequisitionFormRequestDto
  ): Promise<PurchaseProduct> {
    const unit = await unitRepository.findOneBy({ slug: purchaseProductDto.unit });
    if (!unit) throw new GlobalError(ErrorCodes.UNIT_NOT_FOUND);
  
    const temporaryProductMapper = mapper.map(
      purchaseProductDto,
      CreateTemporaryProductRequestDto,
      TemporaryProduct
    );
    Object.assign(temporaryProductMapper, { unit });
  
    const purchaseProductMapper = mapper.map(
      purchaseProductDto,
      CreatePurchaseProductWithoutRequisitionFormRequestDto,
      PurchaseProduct
    );
    Object.assign(purchaseProductMapper, { isExistProduct: false, temporaryProduct: temporaryProductMapper });
    return purchaseProductMapper;
  }
  
  // 7. Hàm tạo `ProductPurchaseForm`
  private async createProductPurchaseForm(
    requestData: CreateProductPurchaseFormWithoutProductRequisitionFormRequestDto,
    purchaseProducts: PurchaseProduct[]
  ): Promise<ProductPurchaseFormResponseDto> {
    const formMapper = mapper.map(
      requestData,
      CreateProductPurchaseFormWithoutProductRequisitionFormRequestDto,
      ProductPurchaseForm
    );
    Object.assign(formMapper, {
      status: ProductPurchaseFormStatus.WAITING,
      purchaseProducts,
    });
    const form = await productPurchaseFormRepository.createAndSave(formMapper);
  
    const formDto = mapper.map(form, ProductPurchaseForm, ProductPurchaseFormResponseDto);
    return formDto;
  }
  

  // create from a product requisition form
  public async createProductPurchaseFormFromProductRequisitionForm(
    plainData: TCreateProductPurchaseFormFromProductRequisitionFormRequestDto
  ): Promise<ProductPurchaseFormResponseDto> {
    const requestData = 
      plainToClass(CreateProductPurchaseFormFromProductRequisitionFormRequestDto, plainData);
    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const codeExisted = await productPurchaseFormRepository.existsBy({
      code: requestData.code,
    });
    if(codeExisted)
      throw new GlobalError(ErrorCodes.PRODUCT_PURCHASE_FORM_CODE_EXISTED);

    const productRequisitionForm = await productRequisitionFormRepository.findOne({
      where: {
        slug: requestData.productRequisitionForm
      },
      relations: [
        'requestProducts.product.unit',
        'requestProducts.temporaryProduct.unit',
      ]
    });

    if(!productRequisitionForm) throw new GlobalError(ErrorCodes.PRODUCT_REQUISITION_FORM_NOT_FOUND);
    // Can't transfer this form to product purchase form
    if(
      !(productRequisitionForm.status === ProductRequisitionFormStatus.WAITING_EXPORT
      || productRequisitionForm.status === ProductRequisitionFormStatus.EXPORTING)
    ) throw new GlobalError(ErrorCodes.CAN_NOT_CREATE_PURCHASE_FORM_FROM_REQUISITION_FORM);

    // Get quantity each request product from product requisition form
    const baseProductFromProductRequisitionForm : { [key: string]: number} =
      this.getListQuantityProductFromProductRequisitionForm(productRequisitionForm);

    // Get quantity of existed purchase product in existed product purchase forms
    const productPurchaseFormExistFromProductRequisitionForm = 
      await productPurchaseFormRepository.find({
        where: {
          productRequisitionForm: {
            id: productRequisitionForm.id
          }
        },
        relations: [
          'purchaseProducts.product.unit',
          'purchaseProducts.temporaryProduct.unit'
        ]
      });

    // only product is existed in existed purchase form, but all product in product requisition form  
    const quantityPurchaseOfProductsExisted: {
      [key: string]: number
    } = this.getListExistedPurchaseProduct(
      productPurchaseFormExistFromProductRequisitionForm,
    );

    // Compare request product with purchase product in request object  
    const purchaseProductsMapper = [];
    for (let i = 0; i < requestData.purchaseProducts.length; i++) {
      if(requestData.purchaseProducts[i].product && requestData.purchaseProducts[i].purchaseQuantity) {
        const product = await productRepository.findOneBy({
          slug: requestData.purchaseProducts[i].product
        });
        if(product) {
          // check this product is exist or not exist in product requisition form
          if(!baseProductFromProductRequisitionForm[`${product.id}`])
            throw new GlobalError(ErrorCodes.PURCHASE_PRODUCT_IS_NOT_INCLUDE_IN_REQUEST_PRODUCTS);

          // note: use ! to define requestData.purchaseProducts[i].purchaseQuantity is always define
          // because check in if condition above

          // check quantity
          if(quantityPurchaseOfProductsExisted[`${product.id}`]) {
            const totalPurchaseProductQuantity: number = 
              quantityPurchaseOfProductsExisted[`${product.id}`] + requestData.purchaseProducts[i].purchaseQuantity!
            if(
              baseProductFromProductRequisitionForm[`${product.id}`] < totalPurchaseProductQuantity
              ) throw new GlobalError(ErrorCodes.PURCHASE_PRODUCT_QUANTITY_EXCEED_REQUEST_PRODUCT_QUANTITY);
          } else {
            if(
              baseProductFromProductRequisitionForm[`${product.id}`]
              <  requestData.purchaseProducts[i].purchaseQuantity!
            ) throw new GlobalError(ErrorCodes.PURCHASE_PRODUCT_QUANTITY_EXCEED_REQUEST_PRODUCT_QUANTITY);
          }

          const purchaseProductMapper = mapper.map(
            requestData.purchaseProducts[i],
            CreatePurchaseProductFromRequisitionFormRequestDto,
            PurchaseProduct
          );
          Object.assign(purchaseProductMapper, {
            product,
            isExistProduct: true
          });
          purchaseProductsMapper.push(purchaseProductMapper);
          continue;
        }
      } 
      if(requestData.purchaseProducts[i].temporaryProduct 
        && requestData.purchaseProducts[i].purchaseQuantity !== undefined) {
        const temporaryProduct = await temporaryProductRepository.findOneBy({
          slug: requestData.purchaseProducts[i].temporaryProduct
        });
        if(temporaryProduct) {
          // check this temporary product is exist or not exist in product requisition form
          if(!baseProductFromProductRequisitionForm[`${temporaryProduct.id}`])
            throw new GlobalError(ErrorCodes.PURCHASE_PRODUCT_IS_NOT_INCLUDE_IN_REQUEST_PRODUCTS);

          if(quantityPurchaseOfProductsExisted[`${temporaryProduct.id}`]) {
            // request product is existed in purchase product
            const totalPurchaseProductQuantity: number = 
              quantityPurchaseOfProductsExisted[`${temporaryProduct.id}`] + requestData.purchaseProducts[i].purchaseQuantity!;
            if(
              baseProductFromProductRequisitionForm[`${temporaryProduct.id}`] < totalPurchaseProductQuantity
            ) throw new GlobalError(ErrorCodes.PURCHASE_PRODUCT_QUANTITY_EXCEED_REQUEST_PRODUCT_QUANTITY);
          } else {
            if(
              baseProductFromProductRequisitionForm[`${temporaryProduct.id}`]
              < requestData.purchaseProducts[i].purchaseQuantity!
            ) throw new GlobalError(ErrorCodes.PURCHASE_PRODUCT_QUANTITY_EXCEED_REQUEST_PRODUCT_QUANTITY);
          }
          
          const purchaseProductMapper = mapper.map(
            requestData.purchaseProducts[i],
            CreatePurchaseProductFromRequisitionFormRequestDto,
            PurchaseProduct
          );
          Object.assign(purchaseProductMapper, {
            temporaryProduct,
            isExistProduct: false
          });
          purchaseProductsMapper.push(purchaseProductMapper);
          continue;
        }
      }

      // have not product or temporary product
      throw new GlobalError(ErrorCodes.PURCHASE_PRODUCT_IS_NOT_INCLUDE_IN_REQUEST_PRODUCTS);
    }

    //CREATE
    const formMapper = mapper.map(
      requestData,
      CreateProductPurchaseFormFromProductRequisitionFormRequestDto,
      ProductPurchaseForm
    );        
    Object.assign(formMapper, {
      status: ProductPurchaseFormStatus.WAITING,
      purchaseProducts: purchaseProductsMapper
    });
    const updatedForm = await productPurchaseFormRepository.save(formMapper);

    const formDto = mapper.map(
      updatedForm, 
      ProductPurchaseForm, 
      ProductPurchaseFormResponseDto
    );
    return formDto;
  }

  private getListQuantityProductFromProductRequisitionForm(
    productRequisitionForm: ProductRequisitionForm,
  ): { [key: string]: number} {
    const baseProductFromProductRequisitionForm : { [key: string]: number} = {};
    if(!Array.isArray(productRequisitionForm.requestProducts)) 
      throw new GlobalError(ErrorCodes.PRODUCT_REQUISITION_FORM_NOT_FOUND);
    productRequisitionForm.requestProducts.forEach((requestProduct) => {
      if(requestProduct.product && requestProduct.requestQuantity) {
        if(baseProductFromProductRequisitionForm[`${requestProduct.product.id}`]) {
          // is existed
          baseProductFromProductRequisitionForm[`${requestProduct.product.id}`] 
            += requestProduct.requestQuantity;
        } else {
          baseProductFromProductRequisitionForm[`${requestProduct.product.id}`] 
            = requestProduct.requestQuantity;
        }
      }
      if(requestProduct.temporaryProduct && requestProduct.requestQuantity) {
        if(baseProductFromProductRequisitionForm[`${requestProduct.temporaryProduct.id}`]) {
          // is existed
          baseProductFromProductRequisitionForm[`${requestProduct.temporaryProduct.id}`]
            += requestProduct.requestQuantity;
        } else {
          baseProductFromProductRequisitionForm[`${requestProduct.temporaryProduct.id}`]
            = requestProduct.requestQuantity;
        }
      }
    });
    return baseProductFromProductRequisitionForm;
  }
  
  private getListExistedPurchaseProduct(
    productPurchaseFormExistFromProductRequisitionForm: ProductPurchaseForm[],
  ): {[key: string]: number} {
    const quantityPurchaseOfProductsExisted: {
      [key: string]: number} = {};
    if(productPurchaseFormExistFromProductRequisitionForm.length > 0) {
      productPurchaseFormExistFromProductRequisitionForm.forEach((form) => {
        if(form.purchaseProducts) {
          if(form.purchaseProducts.length > 0) {
            form.purchaseProducts.forEach((purchaseProduct) => {
              // product
              if(purchaseProduct.product && purchaseProduct.purchaseQuantity) {
                if(quantityPurchaseOfProductsExisted[`${purchaseProduct.product?.id}`]) {
                  // key is existed
                  quantityPurchaseOfProductsExisted[`${purchaseProduct.product?.id}`]
                    += purchaseProduct.purchaseQuantity;
                } else {
                  quantityPurchaseOfProductsExisted[`${purchaseProduct.product?.id}`] = purchaseProduct.purchaseQuantity;
                }
              }
              // temporary product
              if(purchaseProduct.temporaryProduct && purchaseProduct.purchaseQuantity) {
                if(quantityPurchaseOfProductsExisted[`${purchaseProduct.temporaryProduct?.id}`]) {
                  // key is existed
                  quantityPurchaseOfProductsExisted[`${purchaseProduct.temporaryProduct?.id}`]
                    += purchaseProduct.purchaseQuantity;
                } else {
                  quantityPurchaseOfProductsExisted[`${purchaseProduct.temporaryProduct?.id}`] = purchaseProduct.purchaseQuantity
                }
              }
            })
          }
        } 
      })
    }
    return quantityPurchaseOfProductsExisted;
  }

  public async getAllProductPurchaseForms(
    options: TQueryRequest
  ): Promise<TPaginationOptionResponse<ProductPurchaseFormResponseDto[]>> {
    // Get the total number of products
    const totalProductPurchaseForm =
      await productPurchaseFormRepository.count({});

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
    const totalPages = Math.ceil(totalProductPurchaseForm / pageSize);

    const forms = await productPurchaseFormRepository.find({
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { createdAt: options.order },
      relations: [
        'purchaseProducts.product.unit',
        'purchaseProducts.temporaryProduct.unit',
        'productRequisitionForm'
      ],
    });
    const results: ProductPurchaseFormResponseDto[] = mapper.mapArray(
      forms,
      ProductPurchaseForm,
      ProductPurchaseFormResponseDto
    );
    return {
      items: results,
      page,
      pageSize,
      totalPages,
    };
  }
}

export default new ProductPurchaseFormService();