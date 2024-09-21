import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import {
  productRequisitionFormRepository,
  userRepository,
  productRepository,
  companyRepository,
  requestProductRepository,
  userApprovalRepository,
  approvalLogRepository,
  siteRepository,
  projectRepository,
} from "@repositories";
import {
  TCreateProductRequisitionFormRequestDto,
  TApprovalProductRequisitionFormRequestDto,
  TQueryRequest,
  TPaginationOptionResponse,
} from "@types";
import {
  ProductRequisitionFormResponseDto,
  UserApprovalForApprovalUserResponseDto,
} from "@dto/response";
import {
  CreateProductRequisitionFormRequestDto,
  CreateRequestProductRequestDto,
  CreateUserApprovalRequestDto,
  ApprovalProductRequisitionFormRequestDto,
  CreateApprovalLogRequestDto,
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
  ProductRequisitionFormType,
  ProductRequisitionFormStatus,
  FormApprovalType,
  RoleApproval,
  ApprovalLogStatus,
} from "@enums";
import { In } from "typeorm";

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

    const creator = await userRepository.findOneBy({ id: creatorId });
    if(!creator) throw new GlobalError(ErrorCodes.INVALID_CREATOR);

    const site = await siteRepository.findOneBy({ slug: requestData.siteSlug });
    if(!site) throw new GlobalError(ErrorCodes.SITE_NOT_FOUND);

    const project = await projectRepository.findOneBy({ slug: requestData.projectSlug });
    if(!project) throw new GlobalError(ErrorCodes.PROJECT_NOT_FOUND);
    
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
    form.site = site;
    form.project = project;
    form.creator = creator;
    const createdForm = await productRequisitionFormRepository.createAndSave(form);
    console.log({createdForm})

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
        'company',
        'site',
        'project',
        'creator',
        'userApprovals',
        'userApprovals.user',
        'userApprovals.approvalLogs',
        'requestProducts',
        'requestProducts.product',
      ]
    });

    if (!forms) throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);

    const formsDto: ProductRequisitionFormResponseDto = mapper.map(
      forms,
      ProductRequisitionForm,
      ProductRequisitionFormResponseDto
    );

    return formsDto;
  }
  
  public async getAllProductRequisitionFormsByApprovalUser(
    idUser: string
  ): Promise<UserApprovalForApprovalUserResponseDto[]> {
    const approvalUser = await userApprovalRepository.find({
      where: {
        user: {
          id: idUser
        }
      },
      relations: [
        'productRequisitionForm',
        'productRequisitionForm.company',
        'productRequisitionForm.site',
        'productRequisitionForm.project',
        'productRequisitionForm.creator',
        'productRequisitionForm.requestProducts',
        'productRequisitionForm.requestProducts.product',
        'productRequisitionForm.userApprovals',
        'productRequisitionForm.userApprovals.user',
        'productRequisitionForm.userApprovals.approvalLogs',
      ]
    });

    const formsDto: UserApprovalForApprovalUserResponseDto[] = mapper.mapArray(
      approvalUser,
      UserApproval,
      UserApprovalForApprovalUserResponseDto
    );

    return formsDto
  }

  public async approvalProductRequisitionForm(
    plainData: TApprovalProductRequisitionFormRequestDto
  ): Promise<void>{
    const requestData = plainToClass(ApprovalProductRequisitionFormRequestDto, plainData);
    const errors = await validate(requestData);
    if(errors.length > 0) throw new ValidationError(errors);

    const form = await productRequisitionFormRepository.findOne({
      where: {
        slug: requestData.formSlug
      }
    });
    console.log({form})
    if(!form) throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);

    const approvalUser = await userApprovalRepository.findOne({
      where: {
        slug: requestData.approvalUserSlug
      }, 
      relations: ['user']
    });

    if(!approvalUser) {
      throw new GlobalError(ErrorCodes.APPROVAL_USER_NOT_FOUND);
    }
    if(!approvalUser?.user){
      throw new GlobalError(ErrorCodes.USER_OF_APPROVAL_USER_NOT_FOUND);
    }

    if(form.status === ProductRequisitionFormStatus.WAITING) {
      // form : waiting => approvalUser: approval_stage_1 > wait approval_stage_1 approve
      //checking
      if(approvalUser.roleApproval !== RoleApproval.APPROVAL_STAGE_1) {
        throw new GlobalError(ErrorCodes.INVALID_APPROVAL_USER_FOR_APPROVAL_FORM);
      }

      // change status form
      if(requestData.approvalLogStatus === ApprovalLogStatus.ACCEPT){
        form.status = ProductRequisitionFormStatus.ACCEPTED_STAGE_1;
        form.isRecalled = false;
        await productRequisitionFormRepository.save(form);
      } else {
        // give_back and cancel because give_back === cancel when form.status === waiting
        form.status = ProductRequisitionFormStatus.CANCEL;
        form.isRecalled = true;
        await productRequisitionFormRepository.save(form);
      }

      // create approval log
      const approvalLogData = mapper.map(requestData, CreateApprovalLogRequestDto, ApprovalLog)
      approvalLogData.userApproval = approvalUser;
      await approvalLogRepository.createAndSave(approvalLogData);

    } else if(form.status === ProductRequisitionFormStatus.ACCEPTED_STAGE_1) {
      // form : accepted_stage_1 => approvalUser: approval_stage_2 > wait approval_stage_2 approve
      if(approvalUser.roleApproval !== RoleApproval.APPROVAL_STAGE_2) {
        throw new GlobalError(ErrorCodes.INVALID_APPROVAL_USER_FOR_APPROVAL_FORM);
      }

      if(requestData.approvalLogStatus === ApprovalLogStatus.ACCEPT){
        // update status
        form.status = ProductRequisitionFormStatus.ACCEPTED_STAGE_2;
        form.isRecalled = false;
        await productRequisitionFormRepository.save(form);
      } else if (requestData.approvalLogStatus === ApprovalLogStatus.GIVE_BACK){
        form.status = ProductRequisitionFormStatus.WAITING;
        form.isRecalled = true;
        await productRequisitionFormRepository.save(form);
      } else {
        // CANCEL
        form.status = ProductRequisitionFormStatus.CANCEL;
        form.isRecalled = true;
        await productRequisitionFormRepository.save(form);
      }

      // create approval log
      const approvalLogData = mapper.map(requestData, CreateApprovalLogRequestDto, ApprovalLog)
      approvalLogData.userApproval = approvalUser;
      await approvalLogRepository.createAndSave(approvalLogData);

    } else if(form.status === ProductRequisitionFormStatus.ACCEPTED_STAGE_2) {
      // form : accepted_stage_2 => approvalUser: approval_stage_3 > wait approval_stage_1 approve
      if(approvalUser.roleApproval !== RoleApproval.APPROVAL_STAGE_3) {
        throw new GlobalError(ErrorCodes.INVALID_APPROVAL_USER_FOR_APPROVAL_FORM);
      }

      if(requestData.approvalLogStatus === ApprovalLogStatus.ACCEPT){
        form.status = ProductRequisitionFormStatus.WAITING_EXPORT;
        form.isRecalled = false;
        await productRequisitionFormRepository.save(form);
      } else if (requestData.approvalLogStatus === ApprovalLogStatus.GIVE_BACK){
        form.status = ProductRequisitionFormStatus.ACCEPTED_STAGE_1;
        form.isRecalled = true;
        await productRequisitionFormRepository.save(form);
      } else {
        // CANCEL
        form.status = ProductRequisitionFormStatus.CANCEL;
        form.isRecalled = true;
        await productRequisitionFormRepository.save(form);
      }

      // create approval log
      const approvalLogData = mapper.map(requestData, CreateApprovalLogRequestDto, ApprovalLog)
      approvalLogData.userApproval = approvalUser;
      await approvalLogRepository.createAndSave(approvalLogData);
    } else {
      // form.status: cancel => wait creator edit and resubmit
      // form.status: waiting_export/ exporting => export product
      // form.status: done => completed 
      throw new GlobalError(ErrorCodes.PRODUCT_REQUISITION_FORM_DONE_APPROVAL);
    }
  }

  public async getAllProductRequisitionFormsByCreator(
    idUser: string
  ): Promise<ProductRequisitionFormResponseDto[]> {
    const forms = await productRequisitionFormRepository.find({
      where: {
        creator: {
          id: idUser
        }
      },
      relations: [
        'company',
        'site',
        'project',
        'creator',
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

    return formsDto
  }
}

export default new ProductRequisitionFormService();
