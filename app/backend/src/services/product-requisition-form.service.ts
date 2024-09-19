import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import {
  productRequisitionFormRepository,
  userRepository,
  productRepository,
  companyRepository,
  requestProductRepository,
  userApprovalRepository,
} from "@repositories";
import {
  TPaginationOption,
  TCreateProductRequisitionFormRequestDto,
} from "@types";
import { ProductRequisitionFormResponseDto } from "@dto/response";
import {
  CreateProductRequisitionFormRequestDto,
  CreateRequestProductRequestDto,
  CreateUserApprovalRequestDto,
} from "@dto/request";
import { mapper } from "@mappers";
import {
  ProductRequisitionForm,
  RequestProduct,
  UserApproval,
} from "@entities";
import { GlobalError, ErrorCodes, ValidationError } from "@exception";
import {
  ProductRequisitionFormType,
  ProductRequisitionFormStatus,
  FormApprovalType,
} from "@enums";



class ProductRequisitionFormService {
  public async getAllProductRequisitionForms(
    options: TPaginationOption
  ): Promise<ProductRequisitionFormResponseDto[]> {
    const forms = await productRequisitionFormRepository.find({
      take: options.take,
      skip: options.skip,
      order: { createdAt: options.order },
      relations: [
        'company',
        'userApprovals',
        'userApprovals.user',
        'userApprovals.approvalLogs',
        'requestProducts',
        'requestProducts.product',
      ]
    });

    const formsDto: ProductRequisitionFormResponseDto[] = mapper.mapArray(
      forms,
      ProductRequisitionForm,
      ProductRequisitionFormResponseDto
    );
    return formsDto;
  }

  public async createProductRequisitionForm(
    plainData: TCreateProductRequisitionFormRequestDto
  ): Promise<ProductRequisitionFormResponseDto> {
    // Map plain object to request dto
    const requestData = plainToClass(CreateProductRequisitionFormRequestDto, plainData);

    // CHECKING
    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const codeExisted = await productRequisitionFormRepository.existsBy({
      code: requestData.code,
    });
    if(codeExisted) throw new GlobalError(ErrorCodes.PRODUCT_REQUISITION_FORM_CODE_EXIST);

    if(requestData.type === ProductRequisitionFormType.NORMAL) {
      if(requestData.userApprovals.length !== 3) {
        throw new GlobalError(ErrorCodes.INVALID_QUANTITY_USER_APPROVAL);
      }
    } else if(requestData.type === ProductRequisitionFormType.URGENT) {
      if(requestData.userApprovals.length !== 1) {
        throw new GlobalError(ErrorCodes.INVALID_QUANTITY_USER_APPROVAL);
      }
    } // cần kiểm tra thêm các userApprovals có bị trùng roleApproval không

    const company = await companyRepository.findOneBy({ slug: requestData.companySlug});

    if(!company) throw new GlobalError(ErrorCodes.COMPANY_NOT_FOUND);
    

    for(let i: number = 0; i< requestData.userApprovals.length; i ++) {      
      const user = await userRepository.findOneBy({ slug: requestData.userApprovals[i].userSlug });
      if(!user) throw new GlobalError(ErrorCodes.USER_NOT_FOUND);
    }

    for(let i: number = 0; i< requestData.requestProducts.length; i ++) {
      const product = await productRepository.findOneBy({
        slug: requestData.requestProducts[i].productSlug,
      });
      // tạm thời tạo với những sản phẩm có sẵn
      if(!product) throw new GlobalError(ErrorCodes.PRODUCT_NOT_FOUND);
    }

    // CREATE
    const form = mapper.map(requestData, CreateProductRequisitionFormRequestDto, ProductRequisitionForm);
    form.status = ProductRequisitionFormStatus.WAITING;
    form.company = company;
    const createdForm = await productRequisitionFormRepository.createAndSave(form);
    console.log({createdForm})

    const requestProductList: RequestProduct[] = [];
    for(let i: number = 0; i< requestData.requestProducts.length; i++) {
      const product = await productRepository.findOneBy({
        slug: requestData.requestProducts[i].productSlug,
      });

      if(product) {
        const requestProductData = mapper.map(
          requestData.requestProducts[i], 
          CreateRequestProductRequestDto, 
          RequestProduct
        );
        requestProductData.product = product;
        requestProductData.productRequisitionForm = createdForm;

        const createdRequestProduct = await requestProductRepository.createAndSave(requestProductData);
        requestProductList.push(createdRequestProduct);
      }
    }

    const userApprovalList: UserApproval[] = [];
    for(let i: number = 0; i< requestData.userApprovals.length; i ++) {      
      const user = await userRepository.findOneBy({ slug: requestData.userApprovals[i].userSlug });
      if(user) {
        const userApprovalData = mapper.map(
          requestData.userApprovals[i], 
          CreateUserApprovalRequestDto, 
          UserApproval
        );
        userApprovalData.user = user;
        userApprovalData.productRequisitionForm = createdForm;
        userApprovalData.formType = FormApprovalType.PRODUCT_REQUISITION_FORM;

        const createdUserApproval = await userApprovalRepository.createAndSave(userApprovalData);
        userApprovalList.push(createdUserApproval);
      }
    }

    createdForm.userApprovals = userApprovalList;
    createdForm.requestProducts = requestProductList;
    const updatedForm = await productRequisitionFormRepository.save(createdForm);

    console.log({updatedForm})
    const formDto = mapper.map(updatedForm, ProductRequisitionForm, ProductRequisitionFormResponseDto);
    console.log({formDto})
    return formDto;
  }

  public async getProductRequisitionFormBySlug(
    slug: string
  ): Promise<ProductRequisitionFormResponseDto> {
    const forms = await productRequisitionFormRepository.findOne({
      where: {
        slug
      },
      relations: [
        'company',
        'userApprovals',
        'userApprovals.user',
        'userApprovals.approvalLogs',
        'requestProducts',
        'requestProducts.product',
      ]
    });

    if(!forms) throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);

    const formsDto: ProductRequisitionFormResponseDto = mapper.map(
      forms,
      ProductRequisitionForm,
      ProductRequisitionFormResponseDto
    );

    return formsDto;
  }
}

export default new ProductRequisitionFormService();