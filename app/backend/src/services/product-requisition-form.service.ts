import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import moment from "moment";

import { approvalLogService, excelService, PDFService } from "@services";
import {
  productRequisitionFormRepository,
  userRepository,
  productRepository,
  userApprovalRepository,
  projectRepository,
  assignedUserApprovalRepository,
  unitRepository,
  departmentRepository,
  requestProductRepository,
  approvalLogRepository,
} from "@repositories";
import {
  TCreateProductRequisitionFormRequestDto,
  TApprovalProductRequisitionFormRequestDto,
  TQueryRequest,
  TPaginationOptionResponse,
  TResubmitProductRequisitionFormRequestDto,
  TUpdateGeneralInformationProductRequisitionFormRequestDto,
  TFileResponseDto,
} from "@types";
import {
  ExportRequestProductResponseDto,
  ProductRequisitionFormResponseDto,
} from "@dto/response";
import {
  CreateProductRequisitionFormRequestDto,
  CreateRequestProductRequestDto,
  ApprovalProductRequisitionFormRequestDto,
  ResubmitProductRequisitionFormRequestDto,
  CreateTemporaryProductRequestDto,
  UpdateGeneralInformationProductRequisitionFormRequestDto,
} from "@dto/request";
import { mapper } from "@mappers";
import {
  ProductRequisitionForm,
  RequestProduct,
  UserApproval,
  TemporaryProduct,
} from "@entities";
import { GlobalError, ErrorCodes, ValidationError } from "@exception";
import {
  ProductRequisitionFormStatus,
  FormApprovalType,
  RoleApproval,
  ApprovalLogStatus,
  Action,
  Topic,
} from "@enums";
import { parsePagination, PermissionUtils } from "@utils";
import { In } from "typeorm";
import { StatusCodes } from "http-status-codes";
import { env } from "@constants";
import { Ability, MongoQuery } from "@casl/ability";
import { Subjects } from "@lib/casl";
import { productRequisitionFormProducer } from "producer";

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
    const { page, pageSize } = parsePagination(options);
    // Calculate pagination details
    const totalPages = Math.ceil(totalProductRequisitionForm / pageSize);

    const forms = await productRequisitionFormRepository.find({
      where: { creator: { id: creatorId } },
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { type: "DESC", createdAt: options.order },
      relations: [
        "project",
        "creator.userDepartments.department.site.company",
        "userApprovals.assignedUserApproval.user",
        "userApprovals.approvalLogs",
        "requestProducts.product.unit",
        "requestProducts.temporaryProduct.unit",
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

  public async getAllProductRequisitionFormsCompletedApproval(
    options: TQueryRequest
  ): Promise<TPaginationOptionResponse<ProductRequisitionFormResponseDto[]>> {
    // Get the total number of products
    const totalProductRequisitionForm =
      await productRequisitionFormRepository.count({
        where: {
          status: In([
            ProductRequisitionFormStatus.WAITING_EXPORT,
            ProductRequisitionFormStatus.EXPORTING,
            ProductRequisitionFormStatus.DONE,
          ]),
        },
      });

    // Parse and validate pagination parameters
    const { page, pageSize } = parsePagination(options);

    // Calculate pagination details
    const totalPages = Math.ceil(totalProductRequisitionForm / pageSize);

    const forms = await productRequisitionFormRepository.find({
      where: {
        status: In([
          ProductRequisitionFormStatus.WAITING_EXPORT,
          ProductRequisitionFormStatus.EXPORTING,
          ProductRequisitionFormStatus.DONE,
        ]),
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { type: "DESC", createdAt: options.order },
      relations: [
        "project",
        "creator.userDepartments.department.site.company",
        "userApprovals.assignedUserApproval.user",
        "userApprovals.approvalLogs",
        "requestProducts.product.unit",
        "requestProducts.temporaryProduct.unit",
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

    const existedCode = await productRequisitionFormRepository.existsBy({
      code: requestData.code,
    });
    if (existedCode)
      throw new GlobalError(ErrorCodes.PRODUCT_REQUISITION_FORM_CODE_EXIST);

    const creator = await userRepository.findOne({
      where: {
        id: requestData.creatorId,
      },
      relations: ["userDepartments", "userDepartments.department.site"],
    });

    if (!creator) throw new GlobalError(ErrorCodes.INVALID_CREATOR);

    const department = await departmentRepository.findOne({
      where: { slug: requestData.departmentSlug },
      relations: ["site"],
    });
    if (!department) throw new GlobalError(ErrorCodes.DEPARTMENT_NOT_FOUND);

    const assignedUserApprovals = await assignedUserApprovalRepository.find({
      where: {
        formType: FormApprovalType.PRODUCT_REQUISITION_FORM,
        site: {
          id: department.site?.id,
        },
      },
      relations: ["user"],
    });

    if (assignedUserApprovals.length !== 3)
      throw new GlobalError(ErrorCodes.INVALID_QUANTITY_USER_APPROVAL);

    const firstStageApprover = assignedUserApprovals.find(
      (item) => item.roleApproval === RoleApproval.APPROVAL_STAGE_1
    );
    const secondStageApprover = assignedUserApprovals.find(
      (item) => item.roleApproval === RoleApproval.APPROVAL_STAGE_2
    );
    const thirdStageApprover = assignedUserApprovals.find(
      (item) => item.roleApproval === RoleApproval.APPROVAL_STAGE_3
    );

    if (!(firstStageApprover && secondStageApprover && thirdStageApprover))
      throw new GlobalError(ErrorCodes.MISSING_USER_APPROVAL);

    // const project = await projectRepository.findOneBy({
    //   slug: requestData.project,
    // });
    // if (!project) throw new GlobalError(ErrorCodes.PROJECT_NOT_FOUND);

    // Create product requisition form
    const form = mapper.map(
      requestData,
      CreateProductRequisitionFormRequestDto,
      ProductRequisitionForm
    );
    Object.assign(form, {
      status: ProductRequisitionFormStatus.WAITING,
      // project,
      creator,
    });

    // Map request products
    const requestProducts = await Promise.all(
      requestData.requestProducts.map(async (item) => {
        const unit = await unitRepository.findOneBy({ slug: item.unit });
        if (!unit) throw new GlobalError(ErrorCodes.UNIT_NOT_FOUND);

        const product = await productRepository.findOneBy({
          slug: item.product,
        });

        if (!product) {
          const temporaryProduct = mapper.map(
            item,
            CreateTemporaryProductRequestDto,
            TemporaryProduct
          );
          Object.assign(temporaryProduct, { unit });
          const requestProduct = mapper.map(
            item,
            CreateRequestProductRequestDto,
            RequestProduct
          );
          Object.assign(requestProduct, {
            temporaryProduct,
            isExistProduct: false,
          });
          return requestProduct;
        }
        const requestProduct = mapper.map(
          item,
          CreateRequestProductRequestDto,
          RequestProduct
        );
        Object.assign(requestProduct, { product });
        return requestProduct;
      })
    );

    // Map user approvals
    const userApprovals = assignedUserApprovals.map((item) => {
      return {
        assignedUserApproval: item,
      } as UserApproval;
    });

    Object.assign(form, { requestProducts, userApprovals });
    const created = await productRequisitionFormRepository.createAndSave(form);

    // Send message
    await productRequisitionFormProducer.publish({
      topic: `${Topic.PRODUCT_REQUISITION_FORM}`,
      message: JSON.stringify({
        message: "Product requisition form has been created successfully",
        userId: form.creator?.id,
        url: "/product-requisitions",
        type: `${Topic.PRODUCT_REQUISITION_FORM}.creation`,
      }),
    });

    // Send message to remind first-stage approver approve form
    await productRequisitionFormProducer.publish({
      topic: `${Topic.PRODUCT_REQUISITION_FORM}`,
      message: JSON.stringify({
        message: "Product requisition form need to be approved",
        userId: firstStageApprover.user?.id,
        url: "/product-requisitions/approval",
        type: `${Topic.PRODUCT_REQUISITION_FORM}.approval`,
      }),
    });

    const formDto = mapper.map(
      created,
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
        "creator.userDepartments.department.site.company",
        "userApprovals.assignedUserApproval.user",
        "userApprovals.approvalLogs",
        "requestProducts.product.unit",
        "requestProducts.temporaryProduct.unit",
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

    // Validate user approval
    const userApproval = await userApprovalRepository.findOne({
      where: {
        assignedUserApproval: {
          user: {
            id: userId,
          },
        },
        productRequisitionForm: {
          slug: requestData.formSlug,
        },
      },
      relations: [
        "assignedUserApproval.user",
        "productRequisitionForm.requestProducts.product",
        "approvalLogs",
      ],
    });
    if (!userApproval) throw new GlobalError(StatusCodes.FORBIDDEN);

    // validate form
    let form = await productRequisitionFormRepository.findOne({
      where: {
        slug: requestData.formSlug,
      },
      relations: [
        "creator",
        "userApprovals.assignedUserApproval.user",
        "userApprovals.approvalLogs",
        "requestProducts.product.unit",
        "requestProducts.temporaryProduct.unit",
      ],
    });
    if (!form) throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);

    if (form.status === ProductRequisitionFormStatus.WAITING) {
      // form : waiting => approvalUser: approval_stage_1 > wait approval_stage_1 approve
      if (
        userApproval.assignedUserApproval?.roleApproval !==
        RoleApproval.APPROVAL_STAGE_1
      ) {
        throw new GlobalError(StatusCodes.FORBIDDEN);
      }

      const message = {};
      // change status form
      if (requestData.approvalLog?.status === ApprovalLogStatus.ACCEPT) {
        form.status = ProductRequisitionFormStatus.ACCEPTED_STAGE_1;
        form.isRecalled = false;

        // Construct message to send second-stage approver
        const secondStageApprover = form.userApprovals?.find(
          (item) =>
            item.assignedUserApproval?.roleApproval ===
            RoleApproval.APPROVAL_STAGE_2
        );
        Object.assign(message, {
          message: "Product requisition form need to be approved",
          userId: secondStageApprover?.assignedUserApproval?.user?.id,
          url: "/product-requisitions/approval",
          type: `${Topic.PRODUCT_REQUISITION_FORM}.approval`,
        });
      } else {
        // give_back and cancel because give_back === cancel when form.status === waiting
        form.status = ProductRequisitionFormStatus.CANCEL;
        form.isRecalled = true;

        Object.assign(message, {
          message: "Product requisition has been canceled",
          userId: form.creator?.id,
          url: "/product-requisitions",
          type: `${Topic.PRODUCT_REQUISITION_FORM}.cancel`,
        });
      }
      form = await productRequisitionFormRepository.save(form);

      // create approval log
      await approvalLogService.createApprovalLog(
        requestData.approvalLog,
        userApproval
      );

      // Send message
      if (message)
        await productRequisitionFormProducer.publish({
          topic: `${Topic.PRODUCT_REQUISITION_FORM}`,
          message: JSON.stringify(message),
        });

      const formDto = mapper.map(
        form,
        ProductRequisitionForm,
        ProductRequisitionFormResponseDto
      );
      return formDto;
    }

    if (form.status === ProductRequisitionFormStatus.ACCEPTED_STAGE_1) {
      // form : accepted_stage_1 => approvalUser: approval_stage_2 > wait approval_stage_2 approve
      if (
        userApproval.assignedUserApproval?.roleApproval !==
        RoleApproval.APPROVAL_STAGE_2
      ) {
        throw new GlobalError(StatusCodes.FORBIDDEN);
      }

      const message = {};
      if (requestData.approvalLog?.status === ApprovalLogStatus.ACCEPT) {
        form.status = ProductRequisitionFormStatus.ACCEPTED_STAGE_2;
        form.isRecalled = false;

        // Construct message to send third-stage approver
        const thirdStageApprover = form.userApprovals?.find(
          (item) =>
            item.assignedUserApproval?.roleApproval ===
            RoleApproval.APPROVAL_STAGE_3
        );
        Object.assign(message, {
          message: "Product requisition form need to be approved",
          userId: thirdStageApprover?.assignedUserApproval?.user?.id,
          url: "/product-requisitions/approval",
          type: `${Topic.PRODUCT_REQUISITION_FORM}.approval`,
        });
      } else if (
        requestData.approvalLog?.status === ApprovalLogStatus.GIVE_BACK // Second-stage give back the form
      ) {
        form.status = ProductRequisitionFormStatus.WAITING;
        form.isRecalled = true;

        // Message to send first-stage to approve the form
        const firstStageApprover = form.userApprovals?.find(
          (item) =>
            item.assignedUserApproval?.roleApproval ===
            RoleApproval.APPROVAL_STAGE_1
        );
        Object.assign(message, {
          message: "Product requisition has been canceled and needs approval",
          userId: firstStageApprover?.assignedUserApproval?.user?.id,
          url: "/product-requisitions/approval",
          type: `${Topic.PRODUCT_REQUISITION_FORM}.recall`,
        });
      } else {
        //  Second-stage cancel the form
        form.status = ProductRequisitionFormStatus.CANCEL;
        form.isRecalled = true;

        // Send messsage to form creator
        Object.assign(message, {
          message: "Product requisition has been canceled",
          userId: form.creator?.id,
          url: "/product-requisitions",
          type: `${Topic.PRODUCT_REQUISITION_FORM}.cancel`,
        });
      }
      form = await productRequisitionFormRepository.save(form);

      // create approval log
      await approvalLogService.createApprovalLog(
        requestData.approvalLog,
        userApproval
      );

      // Send message
      if (message)
        await productRequisitionFormProducer.publish({
          topic: `${Topic.PRODUCT_REQUISITION_FORM}`,
          message: JSON.stringify(message),
        });

      const formDto = mapper.map(
        form,
        ProductRequisitionForm,
        ProductRequisitionFormResponseDto
      );
      return formDto;
    }

    if (form.status === ProductRequisitionFormStatus.ACCEPTED_STAGE_2) {
      // form : accepted_stage_2 => approvalUser: approval_stage_3 > wait approval_stage_1 approve
      if (
        userApproval.assignedUserApproval?.roleApproval !==
        RoleApproval.APPROVAL_STAGE_3
      ) {
        throw new GlobalError(StatusCodes.FORBIDDEN);
      }

      const message = {};
      // third-stage approver approve the form
      if (requestData.approvalLog?.status === ApprovalLogStatus.ACCEPT) {
        form.status = ProductRequisitionFormStatus.WAITING_EXPORT;
        form.isRecalled = false;
        // Message for warehouse kepper
      } else if (
        requestData.approvalLog?.status === ApprovalLogStatus.GIVE_BACK //  third-stage approver give back the form
      ) {
        form.status = ProductRequisitionFormStatus.ACCEPTED_STAGE_1;
        form.isRecalled = true;

        // Message to send sencond-stage to approve the form
        const firstStageApprover = form.userApprovals?.find(
          (item) =>
            item.assignedUserApproval?.roleApproval ===
            RoleApproval.APPROVAL_STAGE_2
        );
        Object.assign(message, {
          message:
            "Product requisition form has been recalled and needs approval",
          userId: firstStageApprover?.assignedUserApproval?.user?.id,
          url: "/product-requisitions/approval",
          type: `${Topic.PRODUCT_REQUISITION_FORM}.recall`,
        });
      } else {
        form.status = ProductRequisitionFormStatus.CANCEL;
        form.isRecalled = true;

        // Send messsage to form creator
        Object.assign(message, {
          message: "Product requisition has been canceled",
          userId: form.creator?.id,
          url: "/product-requisitions",
          type: `${Topic.PRODUCT_REQUISITION_FORM}.cancel`,
        });
      }
      form = await productRequisitionFormRepository.save(form);

      // create approval log
      await approvalLogService.createApprovalLog(
        requestData.approvalLog,
        userApproval
      );

      // Send message
      if (message)
        await productRequisitionFormProducer.publish({
          topic: `${Topic.PRODUCT_REQUISITION_FORM}`,
          message: JSON.stringify(message),
        });

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

  public async resubmitProductRequisitionForm(
    plainData: TResubmitProductRequisitionFormRequestDto,
    ability?: Ability<[Action, Subjects], MongoQuery>
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
        "userApprovals.assignedUserApproval.user",
        "userApprovals.approvalLogs",
        "requestProducts.product.unit",
        "requestProducts.temporaryProduct.unit",
      ],
    });
    if (!form) throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);

    if (!ability?.can(Action.UPDATE, form))
      throw new GlobalError(StatusCodes.FORBIDDEN);

    Object.assign(form, {
      status: ProductRequisitionFormStatus.WAITING,
      isRecalled: false,
      description: requestData.description,
    });
    form = await productRequisitionFormRepository.save(form);

    // Send messsage to form creator
    await productRequisitionFormProducer.publish({
      topic: Topic.PRODUCT_REQUISITION_FORM,
      message: JSON.stringify({
        message: "Product requisition has been submited",
        userId: form.creator?.id,
        url: "/product-requisitions",
        type: `${Topic.PRODUCT_REQUISITION_FORM}.resubmit`,
      }),
    });

    // Send messsage to form first-stage
    const firstStageApprover = form.userApprovals?.find(
      (item) =>
        item.assignedUserApproval?.roleApproval ===
        RoleApproval.APPROVAL_STAGE_1
    );
    await productRequisitionFormProducer.publish({
      topic: Topic.PRODUCT_REQUISITION_FORM,
      message: JSON.stringify({
        message: "Product requisition need to be approved",
        userId: firstStageApprover?.assignedUserApproval?.user?.id,
        url: "/product-requisitions/approval",
        type: `${Topic.PRODUCT_REQUISITION_FORM}.approval`,
      }),
    });

    const formDto = mapper.map(
      form,
      ProductRequisitionForm,
      ProductRequisitionFormResponseDto
    );
    return formDto;
  }

  public async updateGeneralInformationForm(
    slug: string,
    plainData: TUpdateGeneralInformationProductRequisitionFormRequestDto,
    ability?: Ability<[Action, Subjects], MongoQuery>
  ): Promise<ProductRequisitionFormResponseDto> {
    const requestData = plainToClass(
      UpdateGeneralInformationProductRequisitionFormRequestDto,
      plainData
    );
    console.log({requestData})
    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const form = await productRequisitionFormRepository.findOne({
      where: {
        slug,
      },
      relations: ["creator"],
    });
    if (!form) throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);

    // if (!ability?.can(Action.UPDATE, form))
    //   throw new GlobalError(StatusCodes.FORBIDDEN);

    const isPermitEdit: boolean =
      PermissionUtils.isPermitEditProductRequisitionForm(
        form.status,
        form.isRecalled
      );
    if (!isPermitEdit) throw new GlobalError(StatusCodes.FORBIDDEN);

    // const project = await projectRepository.findOneBy({
    //   slug: requestData.project,
    // });
    // if (!project) throw new GlobalError(ErrorCodes.PROJECT_NOT_FOUND);

    Object.assign(form, {
      ...requestData,
      // project,
    });
    const updatedForm = await productRequisitionFormRepository.save(form);
    const formDto = mapper.map(
      updatedForm,
      ProductRequisitionForm,
      ProductRequisitionFormResponseDto
    );
    return formDto;
  }

  public async exportExcel({
    formSlug,
    requestUrl,
  }: {
    formSlug: string;
    requestUrl: string;
  }) {
    const form = await productRequisitionFormRepository.findOne({
      where: {
        slug: formSlug,
      },
      relations: [
        "creator.userDepartments.department.site.company",
        "requestProducts.product.unit",
        "requestProducts.temporaryProduct.unit",
        "project",
      ],
    });
    if (!form) throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);
    if (!form.code) throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);
    if (!form.requestProducts) throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);

    // Get form info
    let siteName: string = "N/A";
    let companyLogo: string | null = "N/A";
    if (
      form?.creator?.userDepartments &&
      form.creator.userDepartments.length > 0
    ) {
      if (form.creator.userDepartments[0].department?.site?.name) {
        siteName = form.creator?.userDepartments[0].department?.site?.name;
      }
      if (form.creator.userDepartments[0].department?.site?.company?.logo) {
        companyLogo =
          form.creator.userDepartments[0].department.site.company.logo;
      }
    }

    // Get request products
    const requestProducts = mapper.mapArray(
      form.requestProducts,
      RequestProduct,
      ExportRequestProductResponseDto
    );

    // Get user signature
    const userSignatures = [
      {
        title: "Người lập phiếu",
        signature: form.creator?.signature,
      },
    ];
    const userApprovals = await userApprovalRepository.find({
      where: { productRequisitionForm: { id: form.id } },
      order: {
        assignedUserApproval: {
          roleApproval: "ASC",
        },
      },
      relations: ["assignedUserApproval.user"],
    });
    userApprovals.forEach((item, index) => {
      if (item) {
        userSignatures.push({
          title: `Duyệt bước ${index + 1}`,
          signature: item.assignedUserApproval?.user?.signature,
        });
      }
    });

    const cellData: {
      cellPosition: string;
      value: string;
      type: string;
    }[] = [
      {
        cellPosition: "A1",
        value: `${requestUrl}/api/${env.tag}/files/${companyLogo}`, // This is an image URL
        type: "image", // Specifying that this is an image
      },
      {
        cellPosition: "B5",
        value: form.creator?.fullname || "N/A",
        type: "data",
      },
      {
        cellPosition: "B6",
        value: moment(form.createdAt).format("DD/MM/YYYY"),
        type: "data",
      },
      {
        cellPosition: "E5",
        value: siteName,
        type: "data",
      },
      {
        cellPosition: "E6",
        value: form.project?.name || "N/A",
        type: "data",
      },
      {
        cellPosition: "E6",
        value: form.project?.name || "N/A",
        type: "data",
      },
    ];

    // Request products cell is already declared as an array
    let rowIndex = 10; // Starting row for products
    requestProducts.forEach((item, index) => {
      // Generate cells for each item in the requestProducts array
      cellData.push(
        {
          cellPosition: `A${rowIndex}`, // First column for index (1-based index)
          value: (index + 1).toString(),
          type: "data",
        },
        {
          cellPosition: `B${rowIndex}`, // Second column for product name
          value: item.name || "N/A",
          type: "data",
        },
        {
          cellPosition: `C${rowIndex}`, // Fourth column for provider
          value: item.provider || "N/A",
          type: "data",
        },
        {
          cellPosition: `D${rowIndex}`, // Fifth column for request quantity
          value: item.requestQuantity?.toString() || "N/A",
          type: "data",
        },
        {
          cellPosition: `E${rowIndex}`, // Sixth column for unit
          value: item.unit || "N/A",
          type: "data",
        },
        {
          cellPosition: `F${rowIndex}`, // Seventh column for description
          value: item.description || "N/A",
          type: "data",
        }
      );

      // Move to the next row for the next item
      rowIndex++;
    });

    return await excelService.generate({
      filename: "product-requisition-form.xlsx",
      cellData,
    });
  }

  public async exportPdf({
    slug,
    requestUrl,
  }: {
    slug: string;
    requestUrl: string;
  }): Promise<TFileResponseDto> {
    const form = await productRequisitionFormRepository.findOne({
      where: {
        slug,
      },
      relations: [
        "creator.userDepartments.department.site.company",
        "requestProducts.product.unit",
        "requestProducts.temporaryProduct.unit",
        "project",
      ],
    });
    if (!form) throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);
    if (!form.code) throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);
    if (!form.requestProducts) throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);

    // Get form info
    let siteName: string = "N/A";
    let companyLogo: string | null = "N/A";
    if (
      form?.creator?.userDepartments &&
      form.creator.userDepartments.length > 0
    ) {
      if (form.creator.userDepartments[0].department?.site?.name) {
        siteName = form.creator?.userDepartments[0].department?.site?.name;
      }
      if (form.creator.userDepartments[0].department?.site?.company?.logo) {
        companyLogo =
          form.creator.userDepartments[0].department.site.company.logo;
      }
    }

    // Get request products
    const requestProducts = mapper.mapArray(
      form.requestProducts,
      RequestProduct,
      ExportRequestProductResponseDto
    );

    // Get user signature
    const userSignatures = [
      {
        title: "Người lập phiếu",
        signature: form.creator?.signature,
      },
    ];
    const userApprovals = await userApprovalRepository.find({
      where: { productRequisitionForm: { id: form.id } },
      order: {
        assignedUserApproval: {
          roleApproval: "ASC",
        },
      },
      relations: ["assignedUserApproval.user"],
    });
    userApprovals.forEach((item, index) => {
      if (item) {
        userSignatures.push({
          title: `Duyệt bước ${index + 1}`,
          signature: item.assignedUserApproval?.user?.signature,
        });
      }
    });

    const data = {
      companyLogo,
      qrCode: form.code,
      creatorName: form.creator?.fullname,
      siteName,
      createDate: moment(form.createdAt).format("DD/MM/YYYY"),
      projectName: form.project?.name,
      requestProducts,
      requestUrl,
      userSignatures,
      tag: env.tag,
    };

    const pdf = await PDFService.generatePDF({
      templateName: "product-requisition-form-pdf.ejs",
      data,
    });
    return {
      filename: form.code,
      buffer: pdf,
    };
  }

  public async deleteProductRequisitionForm(
    slug: string
  ): Promise<number>{
    const form = await productRequisitionFormRepository.findOne({
      where: {
        slug
      }, 
      relations: [
        "project",
        "creator.userDepartments.department.site.company",
        "userApprovals.assignedUserApproval.user",
        "userApprovals.approvalLogs",
        "requestProducts.product.unit",
        "requestProducts.temporaryProduct.unit",
      ],
    });
    if(!form) throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);
    
    await Promise.all([
      form.userApprovals && await Promise.all(
        form.userApprovals.map(async (userApproval) => {
          // Xóa các approvalLogs của product
          if (userApproval.approvalLogs) {
            await Promise.all(
              userApproval.approvalLogs.map(approvalLog => approvalLogRepository.softRemove(approvalLog))
            );
          }
          // Xóa product
          await userApprovalRepository.softRemove(userApproval);
        })
      ),
      form.requestProducts && Promise.all(
        form.requestProducts.map((product) => requestProductRepository.softRemove(product))
      ),
    ]);

    const deleted = await productRequisitionFormRepository.softDelete({ slug });
    return deleted.affected || 0;
  }
}

export default new ProductRequisitionFormService();
