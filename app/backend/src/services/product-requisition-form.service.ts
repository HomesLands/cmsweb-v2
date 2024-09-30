import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import {
  productRequisitionFormRepository,
  userRepository,
  productRepository,
  requestProductRepository,
  userApprovalRepository,
  approvalLogRepository,
  projectRepository,
  assignedUserApprovalRepository,
} from "@repositories";
import {
  TCreateProductRequisitionFormRequestDto,
  TApprovalProductRequisitionFormRequestDto,
  TQueryRequest,
  TPaginationOptionResponse,
  TResubmitProductRequisitionFormRequestDto,
} from "@types";
import { ProductRequisitionFormResponseDto } from "@dto/response";
import {
  CreateProductRequisitionFormRequestDto,
  CreateRequestProductRequestDto,
  ApprovalProductRequisitionFormRequestDto,
  CreateApprovalLogRequestDto,
  ResubmitProductRequisitionFormRequestDto,
} from "@dto/request";
import { mapper } from "@mappers";
import {
  ApprovalLog,
  ProductRequisitionForm,
  RequestProduct,
  UserApproval,
} from "@entities";
import { GlobalError, ErrorCodes, ValidationError } from "@exception";
import {
  ProductRequisitionFormStatus,
  FormApprovalType,
  RoleApproval,
  ApprovalLogStatus,
} from "@enums";

class ProductRequisitionFormService {
  public async getAllProductRequisitionForms(
    creatorId: string,
    options: TQueryRequest
  ): Promise<TPaginationOptionResponse<ProductRequisitionFormResponseDto[]>> {
    // Get the total number of products
    const totalProductRequisitionForm =
      await productRequisitionFormRepository.count({
        where: { creator: { id: creatorId } },
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
    const totalPages = Math.ceil(totalProductRequisitionForm / pageSize);

    const forms = await productRequisitionFormRepository.find({
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { type: "DESC", createdAt: options.order },
      relations: [
        "project",
        "creator",
        "userApprovals",
        "userApprovals.assignedUserApproval",
        "userApprovals.assignedUserApproval.user",
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
    creatorId: string,
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

    const codeExisted = await productRequisitionFormRepository.existsBy({
      code: requestData.code,
    });
    if (codeExisted)
      throw new GlobalError(ErrorCodes.PRODUCT_REQUISITION_FORM_CODE_EXIST);

    const creator = await userRepository.findOne({
      where: {
        id: creatorId,
      },
      relations: [
        'userDepartments',
        'userDepartments.department',
      ]
    });

    if (!creator) throw new GlobalError(ErrorCodes.INVALID_CREATOR);
  
    const assignedUserApproval = await assignedUserApprovalRepository.find({
      where: {
        formType: FormApprovalType.PRODUCT_REQUISITION_FORM,
      },
      relations: [
        'user',
      ]
    });

    if(assignedUserApproval.length !== 3)
      throw new GlobalError(ErrorCodes.INVALID_QUANTITY_USER_APPROVAL);

    const userApprovalStageOne = assignedUserApproval.find(
      (item) => item.roleApproval === RoleApproval.APPROVAL_STAGE_1
    );
    console.log({userApprovalStageOne})
    const userApprovalStageTwo = assignedUserApproval.find(
      (item) => item.roleApproval === RoleApproval.APPROVAL_STAGE_2
    );
    const userApprovalStageThree = assignedUserApproval.find(
      (item) => item.roleApproval === RoleApproval.APPROVAL_STAGE_3
    );

    if(!(
      userApprovalStageOne
      && userApprovalStageTwo
      && userApprovalStageThree
    )) throw new GlobalError(ErrorCodes.MISSING_USER_APPROVAL);

    const project = await projectRepository.findOneBy({
      slug: requestData.project,
    });
    if (!project) throw new GlobalError(ErrorCodes.PROJECT_NOT_FOUND);

    for (let i: number = 0; i < requestData.requestProducts.length; i++) {
      const product = await productRepository.findOneBy({
        slug: requestData.requestProducts[i].product,
      });
      // note: Tạm thời chỉ lấy các sản phẩm có trong db
      if (!product) throw new GlobalError(ErrorCodes.PRODUCT_NOT_FOUND);
    }

    // Create product requisition form
    const form = mapper.map(
      requestData,
      CreateProductRequisitionFormRequestDto,
      ProductRequisitionForm
    );
    form.status = ProductRequisitionFormStatus.WAITING;
    form.project = project;
    form.creator = creator;
    const createdForm =
      await productRequisitionFormRepository.createAndSave(form);

    const requestProductList: RequestProduct[] = [];
    for (let i: number = 0; i < requestData.requestProducts.length; i++) {
      const product = await productRepository.findOneBy({
        slug: requestData.requestProducts[i].product,
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
    for (let i: number = 0; i < assignedUserApproval.length; i++) {
      const userApproval = new UserApproval();
      userApproval.assignedUserApproval = assignedUserApproval[i];
      userApproval.productRequisitionForm = form;


      const createdUserApproval =
        await userApprovalRepository.createAndSave(userApproval);
      userApprovalList.push(createdUserApproval);
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
        "project",
        "creator",
        "userApprovals",
        "userApprovals.assignedUserApproval",
        "userApprovals.assignedUserApproval.user",
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

  public async approvalProductRequisitionForm(
    plainData: TApprovalProductRequisitionFormRequestDto,
    userId: string
  ): Promise<ProductRequisitionFormResponseDto> {
    const requestData = plainToClass(
      ApprovalProductRequisitionFormRequestDto,
      plainData
    );

    // Validation request data
    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const userApproval = await userApprovalRepository.findOne({
      where: {
        assignedUserApproval: {
          user: {
            id: userId
          }
        },
        productRequisitionForm: {
          slug: requestData.formSlug
        }
      },
      relations: [
        'assignedUserApproval',
        'assignedUserApproval.user',
        'productRequisitionForm',
        'productRequisitionForm.requestProducts',
        'productRequisitionForm.requestProducts.product',
        'approvalLogs'
      ]
    });

    if(!userApproval) throw new GlobalError(ErrorCodes.FORBIDDEN_APPROVAL_FORM);

    let form = await productRequisitionFormRepository.findOne({
      where: {
        slug: requestData.formSlug,
      },
      relations: [
        "creator",
        "userApprovals",
        "userApprovals.assignedUserApproval",
        "userApprovals.assignedUserApproval.user",
        "userApprovals.approvalLogs",
        "requestProducts",
        "requestProducts.product",
      ],
    });
    if (!form) throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);

    if (form.status === ProductRequisitionFormStatus.WAITING) {
      // form : waiting => approvalUser: approval_stage_1 > wait approval_stage_1 approve
      //checking
      if (userApproval.assignedUserApproval?.roleApproval !== RoleApproval.APPROVAL_STAGE_1) {
        throw new GlobalError(
          ErrorCodes.FORBIDDEN_APPROVAL_FORM
        );
      }

      // change status form
      if (requestData.approvalLogStatus === ApprovalLogStatus.ACCEPT) {
        form.status = ProductRequisitionFormStatus.ACCEPTED_STAGE_1;
        form.isRecalled = false;
      } else {
        // give_back and cancel because give_back === cancel when form.status === waiting
        form.status = ProductRequisitionFormStatus.CANCEL;
        form.isRecalled = true;
      }
      form = await productRequisitionFormRepository.save(form);

      // create approval log
      const approvalLogData = mapper.map(
        requestData,
        CreateApprovalLogRequestDto,
        ApprovalLog
      );
      approvalLogData.userApproval = userApproval;
      await approvalLogRepository.createAndSave(approvalLogData);

      const formDto = mapper.map(
        form,
        ProductRequisitionForm,
        ProductRequisitionFormResponseDto
      );
      return formDto;
    }

    if (form.status === ProductRequisitionFormStatus.ACCEPTED_STAGE_1) {
      // form : accepted_stage_1 => approvalUser: approval_stage_2 > wait approval_stage_2 approve
      if (userApproval.assignedUserApproval?.roleApproval !== RoleApproval.APPROVAL_STAGE_2) {
        throw new GlobalError(
          ErrorCodes.FORBIDDEN_APPROVAL_FORM
        );
      }

      if (requestData.approvalLogStatus === ApprovalLogStatus.ACCEPT) {
        // update status
        form.status = ProductRequisitionFormStatus.ACCEPTED_STAGE_2;
        form.isRecalled = false;
      } else if (
        requestData.approvalLogStatus === ApprovalLogStatus.GIVE_BACK
      ) {
        form.status = ProductRequisitionFormStatus.WAITING;
        form.isRecalled = true;
      } else {
        // CANCEL
        form.status = ProductRequisitionFormStatus.CANCEL;
        form.isRecalled = true;
      }
      form = await productRequisitionFormRepository.save(form);

      // create approval log
      const approvalLogData = mapper.map(
        requestData,
        CreateApprovalLogRequestDto,
        ApprovalLog
      );
      approvalLogData.userApproval = userApproval;
      await approvalLogRepository.createAndSave(approvalLogData);

      const formDto = mapper.map(
        form,
        ProductRequisitionForm,
        ProductRequisitionFormResponseDto
      );
      return formDto;
    }

    if (form.status === ProductRequisitionFormStatus.ACCEPTED_STAGE_2) {
      // form : accepted_stage_2 => approvalUser: approval_stage_3 > wait approval_stage_1 approve
      if (userApproval.assignedUserApproval?.roleApproval !== RoleApproval.APPROVAL_STAGE_3) {
        throw new GlobalError(
          ErrorCodes.FORBIDDEN_APPROVAL_FORM
        );
      }

      if (requestData.approvalLogStatus === ApprovalLogStatus.ACCEPT) {
        form.status = ProductRequisitionFormStatus.WAITING_EXPORT;
        form.isRecalled = false;
      } else if (
        requestData.approvalLogStatus === ApprovalLogStatus.GIVE_BACK
      ) {
        form.status = ProductRequisitionFormStatus.ACCEPTED_STAGE_1;
        form.isRecalled = true;
      } else {
        // CANCEL
        form.status = ProductRequisitionFormStatus.CANCEL;
        form.isRecalled = true;
      }
      form = await productRequisitionFormRepository.save(form);

      // create approval log
      const approvalLogData = mapper.map(
        requestData,
        CreateApprovalLogRequestDto,
        ApprovalLog
      );
      approvalLogData.userApproval = userApproval;
      await approvalLogRepository.createAndSave(approvalLogData);
      const formDto = mapper.map(
        form,
        ProductRequisitionForm,
        ProductRequisitionFormResponseDto
      );
      return formDto;
    }
    // form.status: cancel => wait creator edit and resubmit
    // form.status: waiting_export/ exporting => export product
    // form.status: done => completed
    throw new GlobalError(ErrorCodes.INVALID_FORM_STATUS_TRANSITION);
  }

  public async resubmitRequisitionForm(
    plainData: TResubmitProductRequisitionFormRequestDto,
    creatorId: string
  ): Promise<ProductRequisitionFormResponseDto> {
    const requestData = plainToClass(
      ResubmitProductRequisitionFormRequestDto,
      plainData
    );
    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    let form = await productRequisitionFormRepository.findOne({
      where: {
        slug: requestData.slug,
      },
      relations: [
        "project",
        "creator",
        "userApprovals",
        "userApprovals.assignedUserApproval",
        "userApprovals.assignedUserApproval.user",
        "userApprovals.approvalLogs",
        "requestProducts",
        "requestProducts.product",
      ],
    });
    console.log({ form });
    if (!form) throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);

    if (form.creator) {
      if (form.creator.id !== creatorId)
        throw new GlobalError(ErrorCodes.FORBIDDEN_EDIT_FORM);
    } else {
      throw new GlobalError(ErrorCodes.FORBIDDEN_EDIT_FORM);
    }

    form.status = ProductRequisitionFormStatus.WAITING;
    form.isRecalled = false;
    form.description = requestData.description;

    console.log({ form1: form });

    form = await productRequisitionFormRepository.save(form);
    const formDto = mapper.map(
      form,
      ProductRequisitionForm,
      ProductRequisitionFormResponseDto
    );
    console.log({ formDto });
    return formDto;
  }
}

export default new ProductRequisitionFormService();
