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
  TCreateProductRequisitionFormRequestDto,
  TQueryRequest,
  TPaginationOptionResponse,
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
import { In } from "typeorm";
import { logger } from "@lib/logger";

class ProductRequisitionFormService {
  public async getAllProductRequisitionForms(
    options: TQueryRequest
  ): Promise<TPaginationOptionResponse<ProductRequisitionFormResponseDto[]>> {
    // Get the total number of products
    const totalProductRequisitionForm = await productRepository.count({});

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
    const totalPages = Math.ceil(totalProductRequisitionForm / pageSize);

    const forms = await productRequisitionFormRepository.find({
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { createdAt: options.order },
      relations: [
        "company",
        "userApprovals",
        "userApprovals.user",
        "userApprovals.approvalLogs",
        "requestProducts",
        "requestProducts.product",
      ],
    });

    const results: ProductRequisitionFormResponseDto[] = mapper.mapArray(
      forms,
      ProductRequisitionForm,
      ProductRequisitionFormResponseDto
    );
    return {
      items: results,
      page,
      pageSize,
      totalPages,
    };
  }

  public async createProductRequisitionForm(
    plainData: TCreateProductRequisitionFormRequestDto
  ): Promise<ProductRequisitionFormResponseDto> {
    // Map plain object to request dto
    const requestData = plainToClass(
      CreateProductRequisitionFormRequestDto,
      plainData
    );

    // Validation
    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    // const codeExisted = await productRequisitionFormRepository.existsBy({
    //   code: requestData.code,
    // });
    // if (codeExisted)
    //   throw new GlobalError(ErrorCodes.PRODUCT_REQUISITION_FORM_CODE_EXIST);

    if (requestData.type === ProductRequisitionFormType.NORMAL) {
      if (requestData.userApprovals.length !== 3) {
        throw new GlobalError(ErrorCodes.INVALID_QUANTITY_USER_APPROVAL);
      }
    }
    if (requestData.type === ProductRequisitionFormType.URGENT) {
      if (requestData.userApprovals.length !== 1) {
        throw new GlobalError(ErrorCodes.INVALID_QUANTITY_USER_APPROVAL);
      }
    } // cần kiểm tra thêm các userApprovals có bị trùng roleApproval không

    const company = await companyRepository.findOneBy({
      slug: requestData.companySlug,
    });
    if (!company) throw new GlobalError(ErrorCodes.COMPANY_NOT_FOUND);

    // Validate user approvals
    const userSlugs = requestData.userApprovals.map((item) => item.userSlug);
    const userApprovals = await userRepository.find({
      where: {
        slug: In(userSlugs),
      },
    });
    if (userApprovals.length < userSlugs.length)
      throw new GlobalError(ErrorCodes.MISSING_USER_APPROVAL);

    for (let i: number = 0; i < requestData.requestProducts.length; i++) {
      const product = await productRepository.findOneBy({
        slug: requestData.requestProducts[i].productSlug,
      });
      // tạm thời tạo với những sản phẩm có sẵn
      // Create if not exist
      if (!product) throw new GlobalError(ErrorCodes.PRODUCT_NOT_FOUND);
    }

    // Create product pequisition form
    const form = mapper.map(
      requestData,
      CreateProductRequisitionFormRequestDto,
      ProductRequisitionForm
    );
    form.status = ProductRequisitionFormStatus.WAITING;
    form.company = company;
    const createdForm =
      await productRequisitionFormRepository.createAndSave(form);
    logger.info("", { createdForm });

    const requestProductList: RequestProduct[] = [];
    for (let i: number = 0; i < requestData.requestProducts.length; i++) {
      const product = await productRepository.findOneBy({
        slug: requestData.requestProducts[i].productSlug,
      });

      if (product) {
        const requestProductData = mapper.map(
          requestData.requestProducts[i],
          CreateRequestProductRequestDto,
          RequestProduct
        );
        requestProductData.product = product;
        requestProductData.productRequisitionForm = createdForm;

        const createdRequestProduct =
          await requestProductRepository.createAndSave(requestProductData);
        requestProductList.push(createdRequestProduct);
      }
    }

    const userApprovalList: UserApproval[] = [];
    for (let i: number = 0; i < requestData.userApprovals.length; i++) {
      const user = await userRepository.findOneBy({
        slug: requestData.userApprovals[i].userSlug,
      });
      if (user) {
        const userApprovalData = mapper.map(
          requestData.userApprovals[i],
          CreateUserApprovalRequestDto,
          UserApproval
        );
        userApprovalData.user = user;
        userApprovalData.productRequisitionForm = createdForm;
        userApprovalData.formType = FormApprovalType.PRODUCT_REQUISITION_FORM;

        const createdUserApproval =
          await userApprovalRepository.createAndSave(userApprovalData);
        userApprovalList.push(createdUserApproval);
      }
    }

    createdForm.userApprovals = userApprovalList;
    createdForm.requestProducts = requestProductList;
    const updatedForm =
      await productRequisitionFormRepository.save(createdForm);

    const formDto = mapper.map(
      updatedForm,
      ProductRequisitionForm,
      ProductRequisitionFormResponseDto
    );
    return formDto;
  }

  public async getProductRequisitionFormBySlug(
    slug: string
  ): Promise<ProductRequisitionFormResponseDto> {
    const forms = await productRequisitionFormRepository.findOne({
      where: {
        slug,
      },
      relations: [
        "company",
        "userApprovals",
        "userApprovals.user",
        "userApprovals.approvalLogs",
        "requestProducts",
        "requestProducts.product",
      ],
    });

    if (!forms) throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);

    const formsDto: ProductRequisitionFormResponseDto = mapper.map(
      forms,
      ProductRequisitionForm,
      ProductRequisitionFormResponseDto
    );

    return formsDto;
  }
}

export default new ProductRequisitionFormService();
