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
import { StatusCodes } from "http-status-codes";

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
          id: requestData.productRequisitionForm
        },
        relations: [
          'requestProducts.product',
          'requestProducts.temporaryProduct',
        ]
      });
      console.log({productRequisitionForm})
      if(!productRequisitionForm) throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);
      // Can't transfer this form to product purchase form
      if(
        !(productRequisitionForm.status === ProductRequisitionFormStatus.WAITING_EXPORT
        || productRequisitionForm.status === ProductRequisitionFormStatus.EXPORTING)
      ) throw new GlobalError(ErrorCodes.INVALID_STATUS_FORM);
      //note: đã tạo từ form trước đó
      //note: tạo lần đầu từ form đó
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
      formMapper.status = ProductPurchaseFormStatus.WAITING;
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
    throw new GlobalError(StatusCodes.FORBIDDEN);
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