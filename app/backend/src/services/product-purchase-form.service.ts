import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

import { 
  TCreateProductPurchaseFormRequestDto, 
  TPaginationOptionResponse, 
  TQueryRequest
} from "@types";
import { 
  CreateProductPurchaseFormRequestDto, 
  CreatePurchaseProductRequestDto,
  CreateTemporaryProductRequestDto,
} from "@dto/request";
import { ProductPurchaseFormResponseDto } from "@dto/response";
import { 
  ProductPurchaseForm,
  PurchaseProduct,
  TemporaryProduct,
} from "@entities";
import { ErrorCodes, GlobalError, ValidationError } from "@exception";
import { 
  productPurchaseFormRepository, 
  productRepository, 
  productRequisitionFormRepository, 
  purchaseProductRepository, 
  temporaryProductRepository, 
  unitRepository 
} from "@repositories";
import { ProductPurchaseFormStatus, ProductRequisitionFormStatus } from "@enums";
import { mapper } from "@mappers/index";

class ProductPurchaseFormService {
  public async createProductPurchaseForm(
    plainData: TCreateProductPurchaseFormRequestDto
  ): Promise <ProductPurchaseFormResponseDto> {
    const requestData = plainToClass(CreateProductPurchaseFormRequestDto, plainData);

    console.log({requestData})
    console.log({requestData1: requestData.purchaseProducts})
    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const codeExisted = await productPurchaseFormRepository.existsBy({
      code: requestData.code,
    });
    console.log({codeExisted})
    if(codeExisted)
      throw new GlobalError(ErrorCodes.PRODUCT_PURCHASE_FORM_CODE_EXISTED);

    if(requestData.productRequisitionForm) {
      // note: cần xử lý lại, khi tìm không ra form thì về TH bên dưới hay sao
      const productRequisitionForm = await productRequisitionFormRepository.findOne({
        where: {
          slug: requestData.productRequisitionForm
        },
        relations: [
          'requestProducts.product.unit',
          'requestProducts.temporaryProduct.unit',
        ]
      });
      console.log({productRequisitionForm})
      if(!productRequisitionForm) throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);
      if(!productRequisitionForm.requestProducts) throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);
      if(productRequisitionForm.requestProducts?.length < 1) new GlobalError(ErrorCodes.FORM_NOT_FOUND);
      // Can't transfer this form to product purchase form
      if(
        !(productRequisitionForm.status === ProductRequisitionFormStatus.WAITING_EXPORT
        || productRequisitionForm.status === ProductRequisitionFormStatus.EXPORTING)
      ) throw new GlobalError(ErrorCodes.INVALID_STATUS_FORM);

      // Get quantity each request product from product requisition form
      const baseProductFromProductRequisitionForm : { [key: string]: number} = {};
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

      console.log({baseProductFromProductRequisitionForm})

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

      // only product is existed, but all product in product requisition form  
      const quantityPurchaseOfProductsExisted: {
        [key: string]: {
          current: number;
          max: number;
        };
      } = {};

      if(productPurchaseFormExistFromProductRequisitionForm.length > 0) {
        productPurchaseFormExistFromProductRequisitionForm.forEach((form) => {
          if(form.purchaseProducts) {
            if(form.purchaseProducts.length > 0) {
              form.purchaseProducts.forEach((purchaseProduct) => {
                // product
                if(purchaseProduct.product && purchaseProduct.purchaseQuantity) {
                  if(quantityPurchaseOfProductsExisted[`${purchaseProduct.product?.id}`]) {
                    // key is existed
                    quantityPurchaseOfProductsExisted[`${purchaseProduct.product?.id}`].current
                      += purchaseProduct.purchaseQuantity;
                  } else {
                    quantityPurchaseOfProductsExisted[`${purchaseProduct.product?.id}`] = {
                      current: purchaseProduct.purchaseQuantity,
                      max: baseProductFromProductRequisitionForm[`${purchaseProduct.temporaryProduct?.id}`]
                    };
                  }
                }
                // temporary product
                if(purchaseProduct.temporaryProduct && purchaseProduct.purchaseQuantity) {
                  if(quantityPurchaseOfProductsExisted[`${purchaseProduct.temporaryProduct?.id}`]) {
                    // key is existed
                    quantityPurchaseOfProductsExisted[`${purchaseProduct.temporaryProduct?.id}`].current
                      += purchaseProduct.purchaseQuantity;
                  } else {
                    quantityPurchaseOfProductsExisted[`${purchaseProduct.temporaryProduct?.id}`] = {
                      current: purchaseProduct.purchaseQuantity,
                      max: baseProductFromProductRequisitionForm[`${purchaseProduct.temporaryProduct?.id}`]
                    };
                  }
                }
              })
            }
          } 
        })
      }

      console.log({productPurchaseFormExistFromProductRequisitionForm})

      // Compare request product with purchase product in request object  
      // const purchaseProductOfTemporaryProductMapper = [];
      const purchaseProductsMapper = [];
      for (let i = 0; i < requestData.purchaseProducts.length; i++) {
        if(requestData.purchaseProducts[i].product && requestData.purchaseProducts[i].purchaseQuantity) {
          // đã tồn tại trong product
          const product = await productRepository.findOneBy({
            slug: requestData.purchaseProducts[i].product
          });
          if(product) {
            // not include in request products
            if(!baseProductFromProductRequisitionForm[`${product.id}`])
              throw new GlobalError(ErrorCodes.PURCHASE_PRODUCT_IS_NOT_INCLUDE_IN_REQUEST_PRODUCTS);

            // note: use ! to define requestData.purchaseProducts[i].purchaseQuantity is always define
            // because check in if condition above

            // check quantity
            if(quantityPurchaseOfProductsExisted[`${product.id}`]) {
              if(
                quantityPurchaseOfProductsExisted[`${product.id}`].max
                < (quantityPurchaseOfProductsExisted[`${product.id}`].current
                  + requestData.purchaseProducts[i].purchaseQuantity!)
                ) throw new GlobalError(ErrorCodes.PURCHASE_PRODUCT_QUANTITY_EXCEED_REQUEST_PRODUCT_QUANTITY);
            } else {
              if(
                baseProductFromProductRequisitionForm[`${product.id}`]
                <  requestData.purchaseProducts[i].purchaseQuantity!
              ) throw new GlobalError(ErrorCodes.PURCHASE_PRODUCT_QUANTITY_EXCEED_REQUEST_PRODUCT_QUANTITY);
            }
            

            const purchaseProductMapper = mapper.map(
              requestData.purchaseProducts[i],
              CreatePurchaseProductRequestDto,
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
          && requestData.purchaseProducts[i].purchaseQuantity) {
          // đã tồn tại trong temporary product
          const temporaryProduct = await temporaryProductRepository.findOneBy({
            slug: requestData.purchaseProducts[i].temporaryProduct
          });
          if(temporaryProduct) {
            if(!baseProductFromProductRequisitionForm[`${temporaryProduct.id}`])
              throw new GlobalError(ErrorCodes.PURCHASE_PRODUCT_IS_NOT_INCLUDE_IN_REQUEST_PRODUCTS);

            if(quantityPurchaseOfProductsExisted[`${temporaryProduct.id}`]) {
              if(
                quantityPurchaseOfProductsExisted[`${temporaryProduct.id}`].max
                < (quantityPurchaseOfProductsExisted[`${temporaryProduct.id}`].current
                + requestData.purchaseProducts[i].purchaseQuantity!)
              ) throw new GlobalError(ErrorCodes.PURCHASE_PRODUCT_QUANTITY_EXCEED_REQUEST_PRODUCT_QUANTITY);
            } else {
              if(
                baseProductFromProductRequisitionForm[`${temporaryProduct.id}`]
                < requestData.purchaseProducts[i].purchaseQuantity!
              ) throw new GlobalError(ErrorCodes.PURCHASE_PRODUCT_QUANTITY_EXCEED_REQUEST_PRODUCT_QUANTITY);
            }
            
            const purchaseProductMapper = mapper.map(
              requestData.purchaseProducts[i],
              CreatePurchaseProductRequestDto,
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
      }

      //CREATE
      const formMapper = mapper.map(
        requestData,
        CreateProductPurchaseFormRequestDto,
        ProductPurchaseForm
      );        
      Object.assign(formMapper, {
        status: ProductPurchaseFormStatus.WAITING
      });
      const form = await productPurchaseFormRepository.createAndSave(formMapper);
      const createdPurchaseProducts = [];
      if(purchaseProductsMapper.length > 0) {
        for(let i = 0; i < purchaseProductsMapper.length; i++) {
          Object.assign(purchaseProductsMapper[i], {
            productPurchaseForm: form,
          });
          const createdPurchaseProduct = await purchaseProductRepository.save(purchaseProductsMapper[i]);
          createdPurchaseProducts.push(createdPurchaseProduct);
        }
      }


      Object.assign(form, {
        purchaseProducts: createdPurchaseProducts
      });
      const updatedForm = await productPurchaseFormRepository.save(form);

      const formDto = mapper.map(
        updatedForm, 
        ProductPurchaseForm, 
        ProductPurchaseFormResponseDto
      );
      return formDto;

    } else {
      //CHECKING
      const onlyPurchaseProductsMapper = [];
      const bothTemporaryProductsAndPurchaseProductsMapper = [];
      for (let i = 0; i < requestData.purchaseProducts.length; i++) {
        if(requestData.purchaseProducts[i].product) {
          // đã tồn tại trong product
          const product = await productRepository.findOneBy({
            slug: requestData.purchaseProducts[i].product
          });
          if(product) {
            const purchaseProductMapper = mapper.map(
              requestData.purchaseProducts[i],
              CreatePurchaseProductRequestDto,
              PurchaseProduct
            );
            Object.assign(purchaseProductMapper, {
              product,
              isExistProduct: true
            });
            onlyPurchaseProductsMapper.push(purchaseProductMapper);
            continue;
          }
        } 
        if(requestData.purchaseProducts[i].temporaryProduct) {
          // đã tồn tại trong temporary product
          const temporaryProduct = await temporaryProductRepository.findOneBy({
            slug: requestData.purchaseProducts[i].temporaryProduct
          });
          if(temporaryProduct) {
            const purchaseProductMapper = mapper.map(
              requestData.purchaseProducts[i],
              CreatePurchaseProductRequestDto,
              PurchaseProduct
            );
            Object.assign(purchaseProductMapper, {
              temporaryProduct,
              isExistProduct: false
            });
            onlyPurchaseProductsMapper.push(purchaseProductMapper);
            continue;
          }
        } 

        // Have not created in product or temporary product => create temporary product
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
          CreatePurchaseProductRequestDto,
          PurchaseProduct
        );
        bothTemporaryProductsAndPurchaseProductsMapper.push({
          purchaseProductMapper,
          temporaryProductMapper
        });
      }

      //CREATE
      const formMapper = mapper.map(
        requestData,
        CreateProductPurchaseFormRequestDto,
        ProductPurchaseForm
      );        
      Object.assign(formMapper, {
        status: ProductPurchaseFormStatus.WAITING
      });
      const form = await productPurchaseFormRepository.createAndSave(formMapper);
      const createdPurchaseProducts = [];
      console.log({bothTemporaryProductsAndPurchaseProductsMapper})
      console.log({onlyPurchaseProductsMapper})
      if(onlyPurchaseProductsMapper.length > 0) {
        for(let i = 0; i < onlyPurchaseProductsMapper.length; i++) {
          Object.assign(onlyPurchaseProductsMapper[i], {
            productPurchaseForm: form,
          });
          const createdPurchaseProduct = await purchaseProductRepository.save(onlyPurchaseProductsMapper[i]);
          createdPurchaseProducts.push(createdPurchaseProduct);
        }
      }

      console.log({createdPurchaseProducts})

      if(bothTemporaryProductsAndPurchaseProductsMapper.length > 0) {
        for(let i = 0; i < bothTemporaryProductsAndPurchaseProductsMapper.length; i++) {
          const createdTemporaryProduct = await temporaryProductRepository.createAndSave(
            bothTemporaryProductsAndPurchaseProductsMapper[i].temporaryProductMapper
          );
          Object.assign(bothTemporaryProductsAndPurchaseProductsMapper[i].purchaseProductMapper, {
            temporaryProduct: createdTemporaryProduct,
            isExistProduct: false,
            productPurchaseForm: form,
          });

          const createdPurchaseProduct = await purchaseProductRepository.save(
            bothTemporaryProductsAndPurchaseProductsMapper[i].purchaseProductMapper
          );
          createdPurchaseProducts.push(createdPurchaseProduct);
        }
      }

      Object.assign(form, {
        purchaseProducts: createdPurchaseProducts
      });
      const updatedForm = await productPurchaseFormRepository.save(form);

      const formDto = mapper.map(
        updatedForm, 
        ProductPurchaseForm, 
        ProductPurchaseFormResponseDto
      );
      return formDto;
    }
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