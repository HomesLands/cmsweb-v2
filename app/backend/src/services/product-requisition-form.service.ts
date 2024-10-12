import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Workbook } from "exceljs";
import moment from "moment";

import { excelService, PDFService } from "@services";
import {
  productRequisitionFormRepository,
  userRepository,
  productRepository,
  requestProductRepository,
  userApprovalRepository,
  approvalLogRepository,
  projectRepository,
  assignedUserApprovalRepository,
  temporaryProductRepository,
  unitRepository,
} from "@repositories";
import {
  TCreateProductRequisitionFormRequestDto,
  TApprovalProductRequisitionFormRequestDto,
  TQueryRequest,
  TPaginationOptionResponse,
  TResubmitProductRequisitionFormRequestDto,
  TUpdateGeneralInformationProductRequisitionFormRequestDto,
} from "@types";
import {
  ExportRequestProductResponseDto,
  ProductRequisitionFormResponseDto,
} from "@dto/response";
import {
  CreateProductRequisitionFormRequestDto,
  CreateRequestProductRequestDto,
  ApprovalProductRequisitionFormRequestDto,
  CreateApprovalLogRequestDto,
  ResubmitProductRequisitionFormRequestDto,
  CreateTemporaryProductRequestDto,
  UpdateGeneralInformationProductRequisitionFormRequestDto,
} from "@dto/request";
import { mapper } from "@mappers";
import {
  ApprovalLog,
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
} from "@enums";
import { parsePagination, PermissionUtils } from "@utils";
import { In } from "typeorm";
import { forMember } from "@automapper/core";

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
    creatorId: string,
    options: TQueryRequest
  ): Promise<TPaginationOptionResponse<ProductRequisitionFormResponseDto[]>> {
    // Get the total number of products
    const totalProductRequisitionForm =
      await productRequisitionFormRepository.count({
        where: {
          creator: {
            id: creatorId,
          },
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
        creator: {
          id: creatorId,
        },
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
      relations: ["userDepartments", "userDepartments.department.site"],
    });

    if (!creator) throw new GlobalError(ErrorCodes.INVALID_CREATOR);
    if (!creator.userDepartments)
      throw new GlobalError(ErrorCodes.INVALID_CREATOR);
    if (!creator.userDepartments[0].department?.site?.id)
      throw new GlobalError(ErrorCodes.INVALID_CREATOR);

    const assignedUserApproval = await assignedUserApprovalRepository.find({
      where: {
        formType: FormApprovalType.PRODUCT_REQUISITION_FORM,
        site: {
          id: creator.userDepartments[0].department?.site?.id,
        },
      },
      relations: ["user"],
    });

    if (assignedUserApproval.length !== 3)
      throw new GlobalError(ErrorCodes.INVALID_QUANTITY_USER_APPROVAL);

    const userApprovalStageOne = assignedUserApproval.find(
      (item) => item.roleApproval === RoleApproval.APPROVAL_STAGE_1
    );
    const userApprovalStageTwo = assignedUserApproval.find(
      (item) => item.roleApproval === RoleApproval.APPROVAL_STAGE_2
    );
    const userApprovalStageThree = assignedUserApproval.find(
      (item) => item.roleApproval === RoleApproval.APPROVAL_STAGE_3
    );

    if (
      !(userApprovalStageOne && userApprovalStageTwo && userApprovalStageThree)
    )
      throw new GlobalError(ErrorCodes.MISSING_USER_APPROVAL);

    const project = await projectRepository.findOneBy({
      slug: requestData.project,
    });
    if (!project) throw new GlobalError(ErrorCodes.PROJECT_NOT_FOUND);

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
        const requestProductMapped = mapper.map(
          requestData.requestProducts[i],
          CreateRequestProductRequestDto,
          RequestProduct
        );
        requestProductMapped.product = product;
        requestProductMapped.productRequisitionForm = createdForm;

        const createdRequestProduct =
          await requestProductRepository.createAndSave(requestProductMapped);
        requestProductList.push(createdRequestProduct);
      } else {
        // product not exist
        const requestProductData = requestData.requestProducts[i];
        const unit = await unitRepository.findOneBy({
          slug: requestProductData.unit,
        });
        // note: có nên check trước khi tạo???
        if (!unit) throw new GlobalError(ErrorCodes.UNIT_NOT_FOUND);

        const temporaryRequestProductData = mapper.map(
          requestProductData,
          CreateTemporaryProductRequestDto,
          TemporaryProduct
        );
        temporaryRequestProductData.unit = unit;
        const temporaryProduct = await temporaryProductRepository.createAndSave(
          temporaryRequestProductData
        );
        const requestProductMapped = mapper.map(
          requestData.requestProducts[0],
          CreateRequestProductRequestDto,
          RequestProduct
        );
        requestProductMapped.temporaryProduct = temporaryProduct;
        requestProductMapped.productRequisitionForm = createdForm;
        requestProductMapped.isExistProduct = false;
        const createdRequestProduct =
          await requestProductRepository.createAndSave(requestProductMapped);
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
        "creator.userDepartments.department.site.company",
        "userApprovals",
        "userApprovals.assignedUserApproval",
        "userApprovals.assignedUserApproval.user",
        "userApprovals.approvalLogs",
        "requestProducts",
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
        "assignedUserApproval",
        "assignedUserApproval.user",
        "productRequisitionForm",
        "productRequisitionForm.requestProducts",
        "productRequisitionForm.requestProducts.product",
        "approvalLogs",
      ],
    });

    if (!userApproval)
      throw new GlobalError(ErrorCodes.FORBIDDEN_APPROVAL_FORM);

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
        "requestProducts.product.unit",
        "requestProducts.temporaryProduct.unit",
      ],
    });
    if (!form) throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);

    if (form.status === ProductRequisitionFormStatus.WAITING) {
      // form : waiting => approvalUser: approval_stage_1 > wait approval_stage_1 approve
      //checking
      if (
        userApproval.assignedUserApproval?.roleApproval !==
        RoleApproval.APPROVAL_STAGE_1
      ) {
        throw new GlobalError(ErrorCodes.FORBIDDEN_APPROVAL_FORM);
      }

      // change status form
      // if (requestData.approvalLogStatus === ApprovalLogStatus.ACCEPT) {
      if (requestData.approvalLog?.status === ApprovalLogStatus.ACCEPT) {
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
        requestData.approvalLog,
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
      if (
        userApproval.assignedUserApproval?.roleApproval !==
        RoleApproval.APPROVAL_STAGE_2
      ) {
        throw new GlobalError(ErrorCodes.FORBIDDEN_APPROVAL_FORM);
      }

      // if (requestData.approvalLogStatus === ApprovalLogStatus.ACCEPT) {
      if (requestData.approvalLog?.status === ApprovalLogStatus.ACCEPT) {
        // update status
        form.status = ProductRequisitionFormStatus.ACCEPTED_STAGE_2;
        form.isRecalled = false;
      } else if (
        // requestData.approvalLogStatus === ApprovalLogStatus.GIVE_BACK
        requestData.approvalLog?.status === ApprovalLogStatus.GIVE_BACK
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
        requestData.approvalLog,
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
      if (
        userApproval.assignedUserApproval?.roleApproval !==
        RoleApproval.APPROVAL_STAGE_3
      ) {
        throw new GlobalError(ErrorCodes.FORBIDDEN_APPROVAL_FORM);
      }

      // if (requestData.approvalLogStatus === ApprovalLogStatus.ACCEPT) {
      if (requestData.approvalLog?.status === ApprovalLogStatus.ACCEPT) {
        form.status = ProductRequisitionFormStatus.WAITING_EXPORT;
        form.isRecalled = false;
      } else if (
        // requestData.approvalLogStatus === ApprovalLogStatus.GIVE_BACK
        requestData.approvalLog?.status === ApprovalLogStatus.GIVE_BACK
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
        requestData.approvalLog,
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

  public async resubmitProductRequisitionForm(
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
        "requestProducts.product.unit",
        "requestProducts.temporaryProduct.unit",
      ],
    });
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

    form = await productRequisitionFormRepository.save(form);
    const formDto = mapper.map(
      form,
      ProductRequisitionForm,
      ProductRequisitionFormResponseDto
    );
    return formDto;
  }

  public async updateGeneralInformationForm(
    creatorId: string,
    slug: string,
    plainData: TUpdateGeneralInformationProductRequisitionFormRequestDto
  ): Promise<ProductRequisitionFormResponseDto> {
    const requestData = plainToClass(
      UpdateGeneralInformationProductRequisitionFormRequestDto,
      plainData
    );
    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const form = await productRequisitionFormRepository.findOne({
      where: {
        slug,
      },
      relations: ["creator"],
    });
    if (!form) throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);

    if (form.creator) {
      if (form.creator?.id !== creatorId)
        throw new GlobalError(ErrorCodes.FORBIDDEN_EDIT_FORM);
    } else {
      // creator not found
      throw new GlobalError(ErrorCodes.FORBIDDEN_EDIT_FORM);
    }

    const isPermitEdit: boolean =
      PermissionUtils.isPermitEditProductRequisitionForm(
        form.status,
        form.isRecalled
      );
    if (!isPermitEdit) throw new GlobalError(ErrorCodes.FORBIDDEN_EDIT_FORM);

    const project = await projectRepository.findOneBy({
      slug: requestData.project,
    });
    if (!project) throw new GlobalError(ErrorCodes.PROJECT_NOT_FOUND);

    Object.assign(form, {
      ...requestData,
      project,
    });
    const updatedForm = await productRequisitionFormRepository.save(form);
    const formDto = mapper.map(
      updatedForm,
      ProductRequisitionForm,
      ProductRequisitionFormResponseDto
    );
    return formDto;
  }

  public async exportExcelProductRequisitionForm(formSlug: string): Promise<{
    code: string;
    workbook: Workbook;
  }> {
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

    let site: string = "N/A";
    let company: string = "N/A";
    if (form.creator)
      if (form.creator.userDepartments)
        if (form.creator?.userDepartments[0].department?.site?.name) {
          site = form.creator?.userDepartments[0].department?.site?.name;
          if (
            form.creator?.userDepartments[0].department?.site?.company?.name
          ) {
            company =
              form.creator?.userDepartments[0].department?.site?.company.name;
          }
        }

    const requestProductExport = form.requestProducts.map(
      (requestProduct, index) => ({
        order: index + 1,
        quantity: requestProduct.requestQuantity,

        name: requestProduct.isExistProduct
          ? requestProduct.product?.name
          : requestProduct.temporaryProduct?.name,

        description: requestProduct.isExistProduct
          ? requestProduct.product?.description
          : requestProduct.temporaryProduct?.description,

        provider: requestProduct.isExistProduct
          ? requestProduct.product?.provider
          : requestProduct.temporaryProduct?.provider,

        unit: requestProduct.isExistProduct
          ? requestProduct.product?.unit?.name
          : requestProduct.temporaryProduct?.unit?.name,
      })
    );

    const workbook = excelService.generateProductRequisitionFormExcel(
      requestProductExport,
      form.creator?.fullname || "N/A",
      moment(form.createdAt).format("DD/MM/YYYY"),
      site,
      form.project?.name || "N/A",
      company
    );

    return {
      code: form.code,
      workbook,
    };
  }

  public async exportPdfProductRequisitionForm({
    slug,
    requestUrl,
  }: {
    slug: string;
    requestUrl: string;
  }): Promise<{
    code: string;
    pdf: Buffer;
  }> {
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
    });
    userApprovals.forEach((item) => {
      if (item) {
        userSignatures.push({
          title: item.assignedUserApproval?.roleApproval || "",
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
    };

    const pdf = await PDFService.generatePDF({
      templateName: "product-requisition-form-pdf.ejs",
      data,
    });
    return {
      code: form.code,
      pdf,
    };
  }
}

export default new ProductRequisitionFormService();
